import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Code2,
  Palette,
  LineChart,
  Building2,
  User,
  Mail,
  Phone,
  PartyPopper,
  Info,
  ArrowLeft,
  ArrowRight,
  Zap,
  X,
  Trash2,
  CheckCircle,
  Plus // <-- ÖNEMLİ: "Plus" ikonunu da import ettik
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createFreelancerApplication } from '../lib/freelancers';
import { cities } from '../data/cities';
import { countries } from '../data/countries';
import { usePrivacyTerms } from '../components/ui/privacy-terms-provider';

/* -------------------------------
   ADIM TİPLERİ VE FORM DATA YAPISI
-------------------------------- */
type FormStep = 1 | 2 | 3 | 4;
type LocationType = 'turkey' | 'international';
type WorkPreference = 'remote' | 'hybrid';
type PortfolioLink = { title: string; url: string };
type SocialLink = { platform: string; url: string };

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  locationType: LocationType;
  city: string;
  country: string;
  workPreference: WorkPreference;
  categories: string[];
  mainExpertise: string[];
  subExpertise: string[];
  toolsAndTechnologies: string[];
  educationStatus: string;
  workStatus: string;
  aboutText: string;
  portfolioLinks: PortfolioLink[];
  socialLinks: SocialLink[];
}

/* -------------------------------
   KATEGORİ VE UZMANLIK BİLGİLERİ
-------------------------------- */
const categories = [
  {
    id: 'software',
    label: 'Yazılım',
    icon: Code2,
    expertise: [
      'Frontend Geliştirme',
      'Backend Geliştirme',
      'Mobil Uygulama Geliştirme',
      'DevOps',
      'Veri Bilimi',
      'Yapay Zeka / Makine Öğrenmesi',
      'Oyun Geliştirme',
      'Blockchain Geliştirme',
      'IoT Geliştirme',
      'Sistem Mimarisi',
      'Test Otomasyonu',
      'Veritabanı Yönetimi'
    ]
  },
  {
    id: 'design',
    label: 'Tasarım',
    icon: Palette,
    expertise: [
      'UI/UX Tasarım',
      'Grafik Tasarım',
      'Web Tasarım',
      'Mobil Uygulama Tasarımı',
      'Logo Tasarımı',
      'Marka Kimliği Tasarımı',
      '3D Modelleme',
      'İllüstrasyon',
      'Motion Design',
      'Video Editing',
      'Ses Tasarımı',
      'Ambalaj Tasarımı'
    ]
  },
  {
    id: 'marketing',
    label: 'Dijital Pazarlama',
    icon: LineChart,
    expertise: [
      'SEO Uzmanlığı',
      'SEM & Google Ads',
      'Sosyal Medya Yönetimi',
      'İçerik Pazarlama',
      'E-posta Pazarlama',
      'Influencer Marketing',
      'Analitik ve Raporlama',
      'Conversion Optimization',
      'Marka Stratejisi',
      'Pazar Araştırması',
      'Kopya Yazarlığı',
      'Growth Hacking'
    ]
  }
];

/* -------------------------------
   BAŞLANGIÇ FORM VERİSİ
-------------------------------- */
const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  locationType: 'turkey',
  city: '',
  country: '',
  workPreference: 'remote',
  categories: [],
  mainExpertise: [],
  subExpertise: [],
  toolsAndTechnologies: [],
  educationStatus: '',
  workStatus: '',
  aboutText: '',
  portfolioLinks: [],
  socialLinks: []
};

/* -------------------------------
   ADIM GÖSTERGESİ (PROGRESS BAR)
-------------------------------- */
const FormSteps = ({ currentStep }: { currentStep: FormStep }) => (
  <div className="mb-12">
    <div className="flex items-center justify-between relative">
      {/* Ana çizgi */}
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2" />
      {/* Dolu çizgi */}
      <div
        className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
      />
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="relative z-10">
          <div
            className={`
              w-8 h-8 sm:w-10 sm:h-10
              rounded-full flex items-center justify-center
              text-xs sm:text-sm font-medium
              transition-all duration-300
              ${
                currentStep === step
                  ? 'bg-primary text-white scale-110'
                  : currentStep > step
                  ? 'bg-primary/20 text-primary'
                  : 'bg-white/10 text-gray-400'
              }
            `}
          >
            {step}
          </div>
          <div
            className={`
              absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap
              text-[0.6rem] sm:text-sm
              transition-all duration-300
              ${currentStep === step ? 'text-primary' : 'text-gray-400'}
            `}
          >
            {step === 1
              ? 'Kişisel Bilgiler'
              : step === 2
              ? 'Uzmanlık & Araçlar'
              : step === 3
              ? 'Eğitim & Portfolyo'
              : 'Başvuru Özeti'}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* -------------------------------
   BAŞARI MESAJI BİLEŞENİ
-------------------------------- */
const SuccessMessage = ({ onClose }: { onClose: () => void }) => (
  <div className="min-h-screen bg-dark flex items-center justify-center px-4">
    <div className="bg-dark-light/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 max-w-md w-full mx-auto text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
      <div className="absolute -left-20 -top-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="relative">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
        >
          <PartyPopper className="w-8 h-8 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Başvurunuz Alındı!</h2>
        <p className="text-gray-400 mb-8">
          Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
        >
          Ana Sayfaya Dön
        </motion.button>
      </div>
    </div>
  </div>
);

/* -------------------------------
   ANA BİLEŞEN: JOINUS
-------------------------------- */
const JoinUs = () => {
  const navigate = useNavigate();
  const { openPrivacyPolicy, openTerms } = usePrivacyTerms();

  /* Form State */
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [newTool, setNewTool] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  /* Kategorilere göre ana uzmanlıklar */
  const availableExpertise = useMemo(() => {
    return categories
      .filter((cat) => formData.categories.includes(cat.id))
      .map((cat) => cat.expertise)
      .flat();
  }, [formData.categories]);

  /* Adım doğrulama */
  const validateStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName &&
          formData.email &&
          (formData.locationType === 'turkey' ? formData.city : formData.country)
        );
      case 2:
        return formData.categories.length > 0 && formData.mainExpertise.length > 0;
      case 3:
        return formData.educationStatus && formData.workStatus && formData.aboutText;
      case 4:
        return acceptedTerms;
      default:
        return true;
    }
  }, [currentStep, formData, acceptedTerms]);

  /* Form Gönderme */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) {
      setError('Lütfen tüm zorunlu alanları doldurun ve kullanım şartlarını kabul edin.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await createFreelancerApplication({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        location_type: formData.locationType,
        location: formData.locationType === 'turkey' ? formData.city : formData.country,
        work_preference: formData.workPreference,
        main_expertise: formData.mainExpertise,
        sub_expertise: formData.subExpertise,
        tools_and_technologies: formData.toolsAndTechnologies,
        education_status: formData.educationStatus,
        work_status: formData.workStatus,
        about_text: formData.aboutText,
        portfolio_links: formData.portfolioLinks,
        social_links: formData.socialLinks
      });
      setSuccess(true);
      triggerConfetti();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     Portfolyo Linkleri İşlemleri
  ------------------------------ */
  const addPortfolioLink = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, { title: '', url: '' }]
    }));
  }, []);

  const updatePortfolioLink = useCallback(
    (index: number, field: keyof PortfolioLink, value: string) => {
      setFormData((prev) => ({
        ...prev,
        portfolioLinks: prev.portfolioLinks.map((link, i) =>
          i === index ? { ...link, [field]: value } : link
        )
      }));
    },
    []
  );

  const removePortfolioLink = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, i) => i !== index)
    }));
  }, []);

  /* -----------------------------
     Sosyal Medya Linkleri İşlemleri
  ------------------------------ */
  const addSocialLink = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  }, []);

  const updateSocialLink = useCallback(
    (index: number, field: keyof SocialLink, value: string) => {
      setFormData((prev) => ({
        ...prev,
        socialLinks: prev.socialLinks.map((link, i) =>
          i === index ? { ...link, [field]: value } : link
        )
      }));
    },
    []
  );

  const removeSocialLink = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  }, []);

  /* -----------------------------
     Kategori Seçimi
  ------------------------------ */
  const toggleCategory = useCallback((categoryId: string) => {
    setFormData((prev) => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId];
      return {
        ...prev,
        categories: newCategories,
        mainExpertise: [],
        subExpertise: []
      };
    });
  }, []);

  /* -----------------------------
     Uzmanlık Seçimi
  ------------------------------ */
  const toggleExpertise = useCallback((expertise: string) => {
    setFormData((prev) => ({
      ...prev,
      mainExpertise: prev.mainExpertise.includes(expertise)
        ? prev.mainExpertise.filter((e) => e !== expertise)
        : [...prev.mainExpertise, expertise]
    }));
  }, []);

  /* Başarı Ekranı */
  if (success) {
    return <SuccessMessage onClose={() => navigate('/')} />;
  }

  /* -----------------------------
     RENDER
  ------------------------------ */
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section (Mobilde ufaltıldı, masaüstünde korunuyor) */}
      <section className="relative z-20 py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/blog-images//2204_w048_n004_56a_p1_56.jpg"
            alt="Join Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark" />
        </div>
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Geri Butonu */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4 sm:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Ana Sayfaya Dön</span>
          </button>
          {/* Başlık & Açıklama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary mb-4 sm:mb-6"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Freelancer Başvurusu</span>
            </motion.div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-white">
              Bize Katılın
            </h1>
            <p className="text-base sm:text-xl text-gray-300">
              Yeteneklerinizi bizimle paylaşın, birlikte büyüyelim
            </p>
          </motion.div>
        </div>
      </section>

      {/* Arka Plan Desenleri */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
        <div className="absolute -left-40 -top-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Form Alanı */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <FormSteps currentStep={currentStep} />
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
            {error}
          </div>
        )}
        <div className="relative bg-dark-light/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 overflow-hidden">
          {/* İç ızgara */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Kişisel Bilgiler */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Kişisel Bilgiler</h2>
                  {/* İsim Soyisim */}
                  <div>
                    <label className="block text-sm font-medium mb-2">İsim Soyisim</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                        }
                        className="w-full bg-dark border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
                        placeholder="Adınız ve soyadınız"
                        required
                      />
                    </div>
                  </div>
                  {/* E-posta */}
                  <div>
                    <label className="block text-sm font-medium mb-2">E-posta</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full bg-dark border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
                        placeholder="E-posta adresiniz"
                        required
                      />
                    </div>
                  </div>
                  {/* Telefon (Opsiyonel) */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon (Opsiyonel)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full bg-dark border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
                        placeholder="+90 555 555 5555"
                      />
                    </div>
                  </div>
                  {/* Konum (Türkiye / Yurt Dışı) */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Konum</label>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, locationType: 'turkey' }))
                          }
                          className={`px-4 py-3 rounded-xl border transition-colors ${
                            formData.locationType === 'turkey'
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-dark border-white/10 text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          Türkiye
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, locationType: 'international' }))
                          }
                          className={`px-4 py-3 rounded-xl border transition-colors ${
                            formData.locationType === 'international'
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-dark border-white/10 text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          Yurt Dışı
                        </button>
                      </div>
                      {formData.locationType === 'turkey' ? (
                        <select
                          value={formData.city}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, city: e.target.value }))
                          }
                          className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                          required
                        >
                          <option value="">Şehir Seçin</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <select
                          value={formData.country}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, country: e.target.value }))
                          }
                          className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                          required
                        >
                          <option value="">Ülke Seçin</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  {/* Çalışma Tercihi (Uzaktan / Hibrit) */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tercih Ettiğiniz Çalışma Sistemi
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, workPreference: 'remote' }))
                        }
                        className={`px-4 py-3 rounded-xl border transition-colors ${
                          formData.workPreference === 'remote'
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-dark border-white/10 text-gray-400 hover:bg-white/5'
                        }`}
                      >
                        Uzaktan
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, workPreference: 'hybrid' }))
                        }
                        className={`px-4 py-3 rounded-xl border transition-colors ${
                          formData.workPreference === 'hybrid'
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-dark border-white/10 text-gray-400 hover:bg-white/5'
                        }`}
                      >
                        Hibrit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Uzmanlık & Araçlar */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Uzmanlık Alanları</h2>
                  {/* Kategori Seçimi */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Çalışmak İstediğiniz Alanlar
                      <span className="text-gray-400 text-xs ml-2">(Birden fazla seçebilirsiniz)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = formData.categories.includes(category.id);
                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => toggleCategory(category.id)}
                            className={`flex items-center space-x-3 p-4 rounded-xl border transition-colors ${
                              isSelected
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-dark border-white/10 text-gray-400 hover:bg-white/5'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{category.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* Ana Uzmanlık */}
                  {formData.categories.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ana Uzmanlık Alanları
                        <span className="text-gray-400 text-xs ml-2">(Birden fazla seçebilirsiniz)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableExpertise.map((expertise) => {
                          const isMain = formData.mainExpertise.includes(expertise);
                          return (
                            <button
                              key={expertise}
                              type="button"
                              onClick={() => toggleExpertise(expertise)}
                              className={`px-4 py-3 rounded-xl border text-left flex items-center space-x-2 transition-colors ${
                                isMain
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'bg-dark border-white/10 text-gray-400 hover:bg-white/5'
                              }`}
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${isMain ? 'opacity-100' : 'opacity-0'}`}
                              />
                              <span>{expertise}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {/* Araç ve Teknolojiler */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kullandığınız Araç ve Teknolojiler
                      <span className="text-gray-400 text-xs ml-2">(Her aracı tek tek ekleyin)</span>
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTool}
                        onChange={(e) => setNewTool(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                        placeholder="Örneğin: VS Code"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newTool.trim() !== '') {
                            setFormData((prev) => ({
                              ...prev,
                              toolsAndTechnologies: [
                                ...prev.toolsAndTechnologies,
                                newTool.trim()
                              ]
                            }));
                            setNewTool('');
                          }
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                      >
                        Ekle
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.toolsAndTechnologies.map((tool, idx) => (
                        <div
                          key={idx}
                          className="flex items-center bg-dark-light/80 border border-white/10 rounded-xl px-3 py-1"
                        >
                          <span className="text-sm">{tool}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                toolsAndTechnologies: prev.toolsAndTechnologies.filter(
                                  (_, i) => i !== idx
                                )
                              }))
                            }
                            className="ml-2 text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Eğitim & Portfolyo */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Eğitim ve Portfolyo</h2>
                  {/* Eğitim Durumu */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Eğitim Durumu</label>
                    <select
                      value={formData.educationStatus}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, educationStatus: e.target.value }))
                      }
                      className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="high-school">Lise</option>
                      <option value="associate">Ön Lisans</option>
                      <option value="bachelor">Lisans</option>
                      <option value="master">Yüksek Lisans</option>
                      <option value="phd">Doktora</option>
                    </select>
                  </div>
                  {/* Çalışma Durumu */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Çalışma Durumu</label>
                    <select
                      value={formData.workStatus}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, workStatus: e.target.value }))
                      }
                      className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="student">Öğrenci</option>
                      <option value="employed">Çalışıyor</option>
                      <option value="freelancer">Serbest Çalışıyor</option>
                      <option value="unemployed">İş Arıyor</option>
                    </select>
                  </div>
                  {/* AboutText */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Kendinizi Kısaca Tanıtın</label>
                    <div className="relative">
                      <textarea
                        value={formData.aboutText}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, aboutText: e.target.value }))
                        }
                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                        rows={5}
                        placeholder="Deneyimleriniz, hedefleriniz ve beklentileriniz hakkında kısa bir bilgi verin..."
                        required
                      />
                      <div className="mt-2 text-sm text-gray-400 flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        Kendinizi, deneyimlerinizi ve kariyer hedeflerinizi anlatın
                      </div>
                    </div>
                  </div>
                  {/* Portfolio Linkleri */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">Portfolyo Linkleri</label>
                      <button
                        type="button"
                        onClick={addPortfolioLink}
                        className="flex items-center space-x-1 text-sm text-primary hover:text-primary-light transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Link Ekle</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.portfolioLinks.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) =>
                              updatePortfolioLink(index, 'title', e.target.value)
                            }
                            placeholder="Başlık"
                            className="flex-1 bg-dark border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) =>
                              updatePortfolioLink(index, 'url', e.target.value)
                            }
                            placeholder="URL"
                            className="flex-[2] bg-dark border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                          />
                          <button
                            type="button"
                            onClick={() => removePortfolioLink(index)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Sosyal Medya Linkleri */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">Sosyal Medya Linkleri</label>
                      <button
                        type="button"
                        onClick={addSocialLink}
                        className="flex items-center space-x-1 text-sm text-primary hover:text-primary-light transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Link Ekle</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.socialLinks.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <select
                            value={link.platform}
                            onChange={(e) =>
                              updateSocialLink(index, 'platform', e.target.value)
                            }
                            className="flex-1 bg-dark border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                          >
                            <option value="">Platform Seçin</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="github">GitHub</option>
                            <option value="behance">Behance</option>
                            <option value="dribbble">Dribbble</option>
                          </select>
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) =>
                              updateSocialLink(index, 'url', e.target.value)
                            }
                            placeholder="URL"
                            className="flex-[2] bg-dark border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                          />
                          <button
                            type="button"
                            onClick={() => removeSocialLink(index)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Başvuru Özeti + Gizlilik Onayı */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Başvuru Özeti ve Onay</h2>
                  <div className="bg-dark border border-white/10 rounded-xl p-4 space-y-2 text-sm text-gray-300">
                    <p><strong>İsim Soyisim:</strong> {formData.fullName}</p>
                    <p><strong>E-posta:</strong> {formData.email}</p>
                    {formData.phone && <p><strong>Telefon:</strong> {formData.phone}</p>}
                    <p>
                      <strong>Konum:</strong>{' '}
                      {formData.locationType === 'turkey' ? formData.city : formData.country}
                    </p>
                    <p><strong>Çalışma Tercihi:</strong> {formData.workPreference}</p>
                    <p><strong>Kategoriler:</strong> {formData.categories.join(', ')}</p>
                    <p><strong>Ana Uzmanlık:</strong> {formData.mainExpertise.join(', ')}</p>
                    <p><strong>Kullandığınız Araçlar:</strong> {formData.toolsAndTechnologies.join(', ')}</p>
                    <p><strong>Eğitim Durumu:</strong> {formData.educationStatus}</p>
                    <p><strong>Çalışma Durumu:</strong> {formData.workStatus}</p>
                    <p><strong>Hakkınızda:</strong> {formData.aboutText}</p>
                    {/* Portfolyo Linkleri */}
                    {formData.portfolioLinks.length > 0 && (
                      <div>
                        <strong>Portfolyo Linkleri:</strong>
                        <ul className="list-disc ml-6">
                          {formData.portfolioLinks.map((link, i) => (
                            <li key={i}>
                              {link.title}:{' '}
                              <a
                                className="text-primary underline"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.url}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Sosyal Medya Linkleri */}
                    {formData.socialLinks.length > 0 && (
                      <div>
                        <strong>Sosyal Medya Linkleri:</strong>
                        <ul className="list-disc ml-6">
                          {formData.socialLinks.map((link, i) => (
                            <li key={i}>
                              {link.platform}:{' '}
                              <a
                                className="text-primary underline"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.url}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mr-2"
                      />
                      <span>
                        <button
                          type="button"
                          onClick={openPrivacyPolicy}
                          className="text-primary hover:text-primary-light underline"
                        >
                          Gizlilik Politikası
                        </button>{' '}
                        ve{' '}
                        <button
                          type="button"
                          onClick={openTerms}
                          className="text-primary hover:text-primary-light underline"
                        >
                          Kullanım Koşulları
                        </button>{' '}
                        nı okudum ve kabul ediyorum.
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Navigasyon Butonları */}
              <div className="flex items-center justify-between pt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as FormStep)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                    currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-dark text-white hover:bg-white/5'
                  } text-sm`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Geri</span>
                </button>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => (prev + 1) as FormStep)}
                    disabled={!validateStep()}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <span>{currentStep === 3 ? 'Önizleme' : 'İleri'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !validateStep()}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Başvuruyu Gönder</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------
   KONFETİ EFEKTİ
-------------------------------- */
function triggerConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1000
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

export default JoinUs;

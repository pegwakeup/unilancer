import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  LineChart,
  Zap,
  ArrowUpRight,
  ArrowLeft,
  Upload,
  Building2,
  User,
  Mail,
  Phone,
  CheckCircle,
  Info,
  X,
  Send,
  PartyPopper,
  CheckCircle as CheckCircleIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { createProjectRequest } from '../lib/projectRequests';
import { usePrivacyTerms } from '../components/ui/privacy-terms-provider';

/* -----------------------------
   Adım Tipleri ve Veri Yapıları
------------------------------ */
type ServiceCategory = 'software' | 'design' | 'digital-strategy';
type ProjectDuration =
  | '1-week'
  | '1-4-weeks'
  | '1-3-months'
  | '3-6-months'
  | '6-months-plus'
  | 'undecided';
type SolutionType = 'one-time' | 'additional-support' | 'regular-service' | 'other';
type FormStep = 1 | 2 | 3 | 4 | 5;

interface FormData {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  project_description: string;
  service_categories: ServiceCategory[];
  solution_type: SolutionType;
  timeline: ProjectDuration;
  brief_url?: string;
  budget_range?: string;
}

/* -----------------------------
   Hizmet Kategorileri ve İçerik
------------------------------ */
const services = {
  software: {
    label: 'Yazılım',
    icon: Code2,
    subServices: [
      'Web Sitesi - Kurumsal, Statik ve E-Ticaret',
      'Mobil Uygulama',
      'S.a.a.S (Software as a Service)',
      'Yapay Zeka',
    ],
  },
  design: {
    label: 'Tasarım',
    icon: Palette,
    subServices: [
      'Web & Mobil Uygulama UI/UX Tasarımı',
      'Basılı & Grafik Tasarım',
      'İllüstrasyon & Özel Grafik Çalışmaları',
      'Kurumsal Kimlik & Marka Tasarımı',
    ],
  },
  'digital-strategy': {
    label: 'Dijital Pazarlama ve Strateji',
    icon: LineChart,
    subServices: [
      'SEO ve Dijital Reklam Yönetimi',
      'Pazar Araştırması & Marka Stratejisi',
      'İçerik Stratejisi ve Yönetimi',
    ],
  },
};

/* -----------------------------
   Çözüm Türleri ve Zaman Çizelgesi
------------------------------ */
const solutionTypes = [
  {
    id: 'one-time',
    title: 'Tek Seferlik Projeler',
    description:
      'İhtiyacınızı dinliyor, uygun ekibi kuruyor ve işinizi tamamlıyoruz.',
  },
  {
    id: 'additional-support',
    title: 'Ek Freelancer Desteği',
    description:
      'Mevcut ekibinizin kapasitesini artırmak için freelancerlarımızı devreye alıyoruz.',
  },
  {
    id: 'regular-service',
    title: 'Yıllık ve Aylık Düzenli İşler',
    description:
      'Sürekli destek gerektiren işleriniz için düzenli hizmet paketlerimizle yanınızdayız.',
  },
  {
    id: 'other',
    title: 'Farklı Bir Çözüme İhtiyacım Var',
    description:
      'Özel ihtiyaçlarınızı bizimle paylaşın, size uygun çözümü birlikte geliştirelim.',
  },
];

const durations = [
  { id: '1-week', label: '1 haftadan kısa sürede' },
  { id: '1-4-weeks', label: '1 ila 4 hafta' },
  { id: '1-3-months', label: '1 ila 3 ay' },
  { id: '3-6-months', label: '3 ila 6 ay' },
  { id: '6-months-plus', label: '6 aydan uzun' },
  { id: 'undecided', label: 'Daha sonra karar vereceğim' },
];

/* -----------------------------
   Başlangıç Form Verisi
------------------------------ */
const initialFormData: FormData = {
  company_name: '',
  contact_name: '',
  email: '',
  phone: '',
  project_description: '',
  service_categories: [],
  solution_type: 'one-time',
  timeline: '1-4-weeks',
};

/* -----------------------------
   İlerleyiş (Adım) Göstergesi
------------------------------ */
const FormSteps = ({ currentStep }: { currentStep: FormStep }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between relative space-x-2">
      {/* Ana çizgi */}
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2" />
      {/* Dolu çizgi */}
      <div
        className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
      />
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="relative z-10">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
              currentStep === step
                ? 'bg-primary text-white scale-110'
                : currentStep > step
                ? 'bg-primary/20 text-primary'
                : 'bg-white/10 text-gray-400'
            }`}
          >
            {step}
          </div>
          <div
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6rem] sm:text-sm transition-all duration-300 ${
              currentStep === step ? 'text-primary' : 'text-gray-400'
            }`}
          >
            {step === 1
              ? 'Hizmet Alanları'
              : step === 2
              ? 'Çözüm Türü'
              : step === 3
              ? 'Zaman Çizelgesi'
              : step === 4
              ? 'Açıklama & Brief'
              : 'İletişim & Onay'}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* -----------------------------
   Ana Bileşen: ProjectRequest
------------------------------ */
const ProjectRequest = () => {
  const navigate = useNavigate();
  const { openPrivacyPolicy, openTerms } = usePrivacyTerms();

  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedSubServices, setSelectedSubServices] = useState<
    Record<ServiceCategory, string[]>
  >({
    software: [],
    design: [],
    'digital-strategy': [],
  });
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  /* -----------------------------
     Kategori ve Alt Hizmet Seçimi
  ------------------------------ */
  const handleServiceToggle = (category: ServiceCategory) => {
    setFormData((prev) => ({
      ...prev,
      service_categories: prev.service_categories.includes(category)
        ? prev.service_categories.filter((c) => c !== category)
        : [...prev.service_categories, category],
    }));
  };

  const handleSubServiceToggle = (category: ServiceCategory, subService: string) => {
    setSelectedSubServices((prev) => ({
      ...prev,
      [category]: prev[category].includes(subService)
        ? prev[category].filter((s) => s !== subService)
        : [...prev[category], subService],
    }));
  };

  /* -----------------------------
     Brief Dosyası Yükleme
  ------------------------------ */
  const handleBriefUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setError('Brief dosyası 8MB\'dan küçük olmalıdır.');
      return;
    }
    setBriefFile(file);
  };

  /* -----------------------------
     Form Gönderme
  ------------------------------ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError('Lütfen gizlilik politikasını ve kullanım koşullarını kabul edin.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Örnek dosya yükleme (URL dönüyor)
      let briefUrl = '';
      if (briefFile) {
        // TODO: Dosya yükleme işlemini implement edin
        briefUrl = 'temp-url';
      }

      await createProjectRequest({
        ...formData,
        brief_url: briefUrl || undefined,
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
     Başvuru Başarılı Ekranı
  ------------------------------ */
  if (success) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="bg-dark-light/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full mx-auto text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] pointer-events-none bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
          <div className="absolute -left-20 -top-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
          <div className="relative">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
            >
              <CheckCircle className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Talebiniz Alındı!</h2>
            <p className="text-gray-400 mb-8">
              Proje talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors inline-flex items-center space-x-2"
            >
              <span>Ana Sayfaya Dön</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    );
  }

  /* -----------------------------
     Formun Adım İçeriklerini 
     Ekleyen JSX
  ------------------------------ */
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        /* Adım 1: Hizmet Alanları */
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">1. Size Hangi Alanlarda Yardımcı Olabiliriz?</h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-4">
              Önce ana alanları seçin, ardından alt alanları belirleyin.
            </p>
            <div className="grid gap-4">
              {Object.entries(services).map(([key, service]) => {
                const category = key as ServiceCategory;
                const Icon = service.icon;
                const isSelected = formData.service_categories.includes(category);
                return (
                  <div key={key} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => handleServiceToggle(category)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-dark-light/50 border-white/10 text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{service.label}</span>
                      </div>
                      <CheckCircleIcon
                        className={`w-5 h-5 transition-opacity ${
                          isSelected ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </button>

                    {/* Alt hizmetler */}
                    {isSelected && (
                      <div className="grid sm:grid-cols-2 gap-3 pl-4">
                        {service.subServices.map((subService, idx) => {
                          const isSubSelected = selectedSubServices[category].includes(subService);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSubServiceToggle(category, subService)}
                              className={`px-4 py-3 rounded-xl border text-left flex items-center space-x-2 transition-colors ${
                                isSubSelected
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'bg-dark-light/50 border-white/10 text-gray-300 hover:bg-white/5'
                              }`}
                            >
                              <CheckCircleIcon
                                className={`w-4 h-4 ${isSubSelected ? 'opacity-100' : 'opacity-0'}`}
                              />
                              <span>{subService}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        );

      case 2:
        /* Adım 2: Çözüm Türü */
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold">2. Hangi Çözümümüz Sizin İçin Uygun?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {solutionTypes.map((solution) => (
                <button
                  key={solution.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      solution_type: solution.id as SolutionType,
                    }))
                  }
                  className={`p-6 rounded-xl border text-left transition-all ${
                    formData.solution_type === solution.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-dark-light/50 border-white/10 hover:bg-white/5'
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      formData.solution_type === solution.id ? 'text-primary' : 'text-white'
                    }`}
                  >
                    {solution.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{solution.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        /* Adım 3: Zaman Çizelgesi */
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold">3. Ne Kadar Sürede Projenin Tamamlanmasını İstersiniz?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {durations.map((duration) => (
                <button
                  key={duration.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      timeline: duration.id as ProjectDuration,
                    }))
                  }
                  className={`px-6 py-4 rounded-xl border transition-colors ${
                    formData.timeline === duration.id
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-dark-light/50 border-white/10 text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        /* Adım 4: Açıklama & Brief */
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold">4. İstediğiniz Hizmetten Biraz Bahsedebilir Misiniz?</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Proje Açıklaması</label>
                <textarea
                  value={formData.project_description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      project_description: e.target.value,
                    }))
                  }
                  className="w-full bg-dark-light/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary min-h-[120px]"
                  placeholder="Projenizi kısaca anlatın..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Brief Belgesi (Opsiyonel)</label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleBriefUpload}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="brief-file"
                  />
                  <label
                    htmlFor="brief-file"
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-dark-light/50 border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    <span>{briefFile ? briefFile.name : 'Brief Belgesi Yükle (PDF, Word)'}</span>
                  </label>
                  {briefFile && (
                    <button
                      type="button"
                      onClick={() => setBriefFile(null)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-400">Maksimum dosya boyutu: 8MB</p>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        /* Adım 5: İletişim & Onay */
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold">5. İletişim Bilgileri</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Şirket Adı</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company_name: e.target.value }))
                    }
                    className="w-full bg-dark-light/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="Şirketinizin adı"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">İletişim Kişisi</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.contact_name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, contact_name: e.target.value }))
                    }
                    className="w-full bg-dark-light/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="Adınız ve soyadınız"
                    required
                  />
                </div>
              </div>
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
                    className="w-full bg-dark-light/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="E-posta adresiniz"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full bg-dark-light/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="+90 555 555 5555"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-start space-x-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <button
                    type="button"
                    onClick={openPrivacyPolicy}
                    className="text-primary hover:text-primary-light underline"
                  >
                    Gizlilik Politikası
                  </button>
                  {' '}ve{' '}
                  <button
                    type="button"
                    onClick={openTerms}
                    className="text-primary hover:text-primary-light underline"
                  >
                    Kullanım Koşulları
                  </button>
                  {' '}nı okudum ve kabul ediyorum.
                </span>
              </label>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  /* -----------------------------
     Ana Render
  ------------------------------ */
  return (
    <div className="min-h-screen bg-dark relative">
      {/* Sabit Kare Arka Plan Deseni */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden z-10">
        <div className="absolute inset-0">
          <img
            src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page//teklif%20al.webp"
            alt="Project Request"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Ana Sayfaya Dön</span>
          </button>
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
              <span className="text-sm sm:text-base">Proje Teklifi</span>
            </motion.div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white">
              Projenizi Hayata Geçirelim
            </h1>
            <p className="text-base sm:text-xl text-gray-300">
              Size özel çözümler için hemen teklif alın
            </p>
          </motion.div>
        </div>
      </section>

      {/* İlerleyiş Göstergesi (Form Kartı Dışında) */}
      <div className="max-w-3xl mx-auto px-4 pb-4">
        <FormSteps currentStep={currentStep} />
      </div>

      {/* Form Kartı */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-dark-light/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 overflow-hidden">
          {/* Arka plan gradienti: pointer-events-none ve z-0 eklenmiştir */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
          <div className="relative z-10">
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dinamik Adım İçerikleri */}
              {renderStepContent()}

              {/* Navigasyon Butonları */}
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as FormStep)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-dark text-white hover:bg-white/5'
                  } text-xs sm:text-sm`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Geri</span>
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => (prev + 1) as FormStep)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs sm:text-sm"
                  >
                    <span>İleri</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !acceptedTerms}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 text-xs sm:text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Teklif Al</span>
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

/* -----------------------------
   Konfeti Efekti
------------------------------ */
function triggerConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1000,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

export default ProjectRequest;

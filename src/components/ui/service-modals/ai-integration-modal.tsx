import React from 'react';
import { ServiceDetailModal } from '../service-detail-modal';

interface AIIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIIntegrationModal = ({ isOpen, onClose }: AIIntegrationModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Entegrasyonları"
      description="İş süreçlerinizi yapay zeka ile güçlendiriyoruz"
      image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Doğal dil işleme (NLP)",
        "Makine öğrenmesi modelleri",
        "Chatbot entegrasyonları",
        "Görüntü işleme ve analizi",
        "Tahminleme ve analitik",
        "Otomatik içerik üretimi"
      ]}
      benefits={[
        "İş süreçlerinde otomasyon",
        "Veri tabanlı karar verme",
        "Müşteri deneyimini iyileştirme",
        "Operasyonel verimliliği artırma",
        "Rekabet avantajı",
        "Maliyet optimizasyonu"
      ]}
      process={[
        {
          title: "Veri Analizi",
          description: "Mevcut verilerinizi analiz eder ve AI stratejisi oluştururuz"
        },
        {
          title: "Model Seçimi",
          description: "İhtiyaçlarınıza uygun AI modellerini belirleriz"
        },
        {
          title: "Entegrasyon",
          description: "AI çözümlerini sistemlerinize entegre ederiz"
        },
        {
          title: "Eğitim ve Test",
          description: "Modelleri eğitir ve performans testleri yaparız"
        },
        {
          title: "Optimizasyon",
          description: "Sürekli öğrenme ve iyileştirme sağlarız"
        }
      ]}
      technologies={[
        "TensorFlow",
        "PyTorch",
        "OpenAI API",
        "Hugging Face",
        "LangChain",
        "scikit-learn",
        "Computer Vision",
        "NLP"
      ]}
      caseStudies={[
        {
          title: "AI Chatbot",
          description: "Müşteri hizmetleri chatbotu. 7/24 destek ve otomatik yönlendirme.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Görüntü Analizi",
          description: "Üretim hattı kalite kontrol sistemi. Gerçek zamanlı hata tespiti.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Tahminleme Sistemi",
          description: "Satış ve talep tahminleme sistemi. Stok optimizasyonu ve planlama.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
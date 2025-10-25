import React from 'react';
import { ServiceDetailModal } from '../../service-detail-modal';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal = ({ isOpen, onClose }: AnalyticsModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Analitik & Raporlama"
      description="İnovatif Analitik Çözümleri: Veri Odaklı Dijital Pazarlama Stratejileri"
      image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Web Analitik",
        "Dönüşüm Optimizasyonu",
        "A/B Testleri",
        "Kullanıcı Davranış Analizi",
        "Performans Raporlama",
        "Özelleştirilmiş Dashboard"
      ]}
      benefits={[
        "Veri odaklı kararlar",
        "Performans iyileştirme",
        "Kullanıcı deneyimi optimizasyonu",
        "ROI artışı",
        "Kaynak optimizasyonu",
        "Rekabet avantajı"
      ]}
      process={[
        {
          title: "Veri Toplama",
          description: "Analitik araçlarının kurulumu ve veri toplama"
        },
        {
          title: "Analiz",
          description: "Veri analizi ve içgörü çıkarma"
        },
        {
          title: "Strateji",
          description: "Veri odaklı strateji geliştirme"
        },
        {
          title: "Optimizasyon",
          description: "Performans optimizasyonu"
        },
        {
          title: "Raporlama",
          description: "Düzenli performans raporlaması"
        }
      ]}
      technologies={[
        "Google Analytics",
        "Google Data Studio",
        "Hotjar",
        "Mixpanel",
        "Amplitude",
        "Optimizely",
        "VWO",
        "Tableau"
      ]}
      caseStudies={[
        {
          title: "E-ticaret Analizi",
          description: "Online mağaza için kapsamlı analitik ve optimizasyon",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Conversion Optimization",
          description: "SaaS platformu için dönüşüm optimizasyonu",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Performance Tracking",
          description: "Çok kanallı pazarlama performans takibi",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
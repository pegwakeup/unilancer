import React from 'react';
import { ServiceDetailModal } from '../../service-detail-modal';

interface DigitalAdsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalAdsModal = ({ isOpen, onClose }: DigitalAdsModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Dijital Reklam"
      description="İnovatif Dijital Reklam Çözümleri: Hedefli ve Etkili Online Reklamlar"
      image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Google Ads Yönetimi",
        "Sosyal Medya Reklamları",
        "Remarketing Kampanyaları",
        "Display Reklamlar",
        "Video Reklamlar",
        "Programatik Reklamcılık"
      ]}
      benefits={[
        "Hedef kitleye doğrudan erişim",
        "Ölçülebilir sonuçlar",
        "Esnek bütçe yönetimi",
        "Hızlı sonuç alma",
        "A/B test imkanı",
        "Detaylı raporlama"
      ]}
      process={[
        {
          title: "Hedef Analizi",
          description: "Hedef kitle ve pazar analizi"
        },
        {
          title: "Strateji",
          description: "Reklam stratejisi ve kanal seçimi"
        },
        {
          title: "Kampanya Kurulumu",
          description: "Reklam kampanyalarının oluşturulması"
        },
        {
          title: "Optimizasyon",
          description: "Performans takibi ve optimizasyon"
        },
        {
          title: "Raporlama",
          description: "Sonuçların analizi ve raporlama"
        }
      ]}
      technologies={[
        "Google Ads",
        "Facebook Ads",
        "Instagram Ads",
        "LinkedIn Ads",
        "TikTok Ads",
        "Google Analytics",
        "Facebook Pixel",
        "Google Tag Manager"
      ]}
      caseStudies={[
        {
          title: "E-ticaret Reklamları",
          description: "Online mağaza için çok kanallı reklam stratejisi",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Lead Generation",
          description: "B2B hizmet için lead generation kampanyaları",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Marka Bilinirliği",
          description: "Yeni marka için bilinirlik kampanyaları",
          image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
import React from 'react';
import { ServiceDetailModal } from '../../service-detail-modal';

interface SEOSEMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SEOSEMModal = ({ isOpen, onClose }: SEOSEMModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="SEO & SEM"
      description="İnovatif SEO ve SEM Çözümleri: Arama Motorlarında Üst Sıralarda Yer Alın"
      image="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Teknik SEO Optimizasyonu",
        "İçerik Stratejisi",
        "Anahtar Kelime Araştırması",
        "Google Ads Yönetimi",
        "Rakip Analizi",
        "Performans Takibi"
      ]}
      benefits={[
        "Organik trafik artışı",
        "Yüksek dönüşüm oranları",
        "Marka bilinirliği",
        "Hedefli reklamlar",
        "Ölçülebilir sonuçlar",
        "ROI odaklı stratejiler"
      ]}
      process={[
        {
          title: "SEO Analizi",
          description: "Mevcut durum ve rakip analizi"
        },
        {
          title: "Strateji",
          description: "SEO ve SEM stratejilerinin belirlenmesi"
        },
        {
          title: "Optimizasyon",
          description: "Teknik SEO ve içerik optimizasyonu"
        },
        {
          title: "Reklam Kampanyaları",
          description: "Google Ads kampanyalarının yönetimi"
        },
        {
          title: "Raporlama",
          description: "Performans takibi ve optimizasyon"
        }
      ]}
      technologies={[
        "Google Analytics",
        "Google Search Console",
        "SEMrush",
        "Ahrefs",
        "Google Ads",
        "Screaming Frog",
        "Moz Pro",
        "Yoast SEO"
      ]}
      caseStudies={[
        {
          title: "E-ticaret SEO",
          description: "Online mağaza için kapsamlı SEO çalışması ve %150 trafik artışı",
          image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "SaaS Reklamları",
          description: "B2B yazılım için Google Ads kampanyaları ve lead generation",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Yerel SEO",
          description: "Restoran zinciri için yerel SEO çalışması ve şube trafiği artışı",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
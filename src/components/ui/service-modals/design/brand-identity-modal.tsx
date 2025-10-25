import React from 'react';
import { ServiceDetailModal } from '../../service-detail-modal';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandIdentityModal = ({ isOpen, onClose }: BrandIdentityModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Kurumsal Kimlik & Marka"
      description="İnovatif Marka Tasarım Çözümleri: Akılda Kalıcı ve Profesyonel Kurumsal Kimlik Tasarımı"
      image="https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Logo Tasarımı",
        "Kurumsal Kimlik Tasarımı",
        "Marka Kılavuzu",
        "Kartvizit & Antetli Kağıt",
        "Sunum Şablonları",
        "Sosyal Medya Kitleri"
      ]}
      benefits={[
        "Güçlü ve akılda kalıcı marka imajı",
        "Profesyonel ve tutarlı görünüm",
        "Rakiplerden farklılaşma",
        "Müşteri güveni ve sadakati",
        "Pazarlama materyallerinde tutarlılık",
        "Kolay uygulanabilir tasarım sistemi"
      ]}
      process={[
        {
          title: "Marka Analizi",
          description: "Marka değerleri ve hedef kitle analizi"
        },
        {
          title: "Rakip Analizi",
          description: "Sektör ve rakip markaların incelenmesi"
        },
        {
          title: "Konsept Geliştirme",
          description: "Logo ve kurumsal kimlik konseptleri"
        },
        {
          title: "Tasarım",
          description: "Seçilen konseptin detaylı tasarımı"
        },
        {
          title: "Uygulama",
          description: "Tüm kurumsal materyal tasarımları"
        }
      ]}
      technologies={[
        "Adobe Illustrator",
        "Adobe Photoshop",
        "Adobe InDesign",
        "Figma",
        "Sketch",
        "Affinity Designer"
      ]}
      caseStudies={[
        {
          title: "Teknoloji Markası",
          description: "Yazılım şirketi için modern kurumsal kimlik tasarımı",
          image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Restoran Zinciri",
          description: "Yeni restoran markası için kapsamlı marka kimliği",
          image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "E-ticaret Markası",
          description: "Online moda mağazası için marka kimliği tasarımı",
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
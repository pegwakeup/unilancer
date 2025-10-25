import React from 'react';
import { ServiceDetailModal } from '../../service-detail-modal';

interface DigitalWebModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalWebModal = ({ isOpen, onClose }: DigitalWebModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Dijital & Web Tasarım"
      description="İnovatif Dijital Tasarım Çözümleri: Kullanıcı Odaklı Web ve Mobil Arayüz Tasarımı"
      image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Responsive Web Tasarımı",
        "UI/UX Tasarımı",
        "E-ticaret Tasarımı",
        "Landing Page Tasarımı",
        "Mobil Uygulama Tasarımı",
        "Wireframe & Prototip"
      ]}
      benefits={[
        "Kullanıcı dostu arayüzler ile daha yüksek dönüşüm oranları",
        "Mobil uyumlu tasarımlar ile her cihazda mükemmel görünüm",
        "Modern ve şık görünüm ile güçlü marka imajı",
        "SEO dostu yapı ile daha iyi arama motoru sıralamaları",
        "Hızlı yükleme süreleri ile düşük bounce rate",
        "A/B testleri ile optimize edilmiş kullanıcı deneyimi"
      ]}
      process={[
        {
          title: "İhtiyaç Analizi",
          description: "Proje hedefleri ve kullanıcı ihtiyaçlarının detaylı analizi"
        },
        {
          title: "UX Araştırması",
          description: "Kullanıcı davranışları ve rakip analizi"
        },
        {
          title: "Wireframe",
          description: "Sayfa yapısı ve kullanıcı akışı tasarımı"
        },
        {
          title: "UI Tasarım",
          description: "Görsel tasarım ve marka uyumlu arayüz geliştirme"
        },
        {
          title: "Prototip",
          description: "İnteraktif prototip oluşturma ve kullanıcı testleri"
        }
      ]}
      technologies={[
        "Figma",
        "Adobe XD",
        "Sketch",
        "InVision",
        "Photoshop",
        "Illustrator",
        "Principle",
        "Framer"
      ]}
      caseStudies={[
        {
          title: "E-ticaret Platformu",
          description: "Modern B2B e-ticaret platformu UI/UX tasarımı. Gelişmiş filtreleme ve kolay sipariş süreci.",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Finans Uygulaması",
          description: "Mobil bankacılık uygulaması için kullanıcı dostu arayüz tasarımı.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Kurumsal Web Sitesi",
          description: "Global teknoloji şirketi için modern ve responsive web sitesi tasarımı.",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
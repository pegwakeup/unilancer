import React from 'react';
import { ServiceDetailModal } from '../service-detail-modal';

interface MobileDevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDevelopmentModal = ({ isOpen, onClose }: MobileDevelopmentModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Mobil Uygulama Geliştirme"
      description="iOS ve Android için native ve cross-platform mobil uygulamalar geliştiriyoruz"
      image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Native iOS ve Android uygulamalar",
        "Cross-platform çözümler",
        "Offline çalışabilme özelliği",
        "Push bildirim entegrasyonu",
        "Konum bazlı servisler",
        "Sosyal medya entegrasyonları"
      ]}
      benefits={[
        "Her platformda tutarlı kullanıcı deneyimi",
        "Hızlı ve performanslı uygulamalar",
        "Düşük bakım maliyeti",
        "App Store ve Google Play mağazalarında yayınlama",
        "Kullanıcı analitikleri ve raporlama",
        "Sürekli teknik destek ve güncelleme"
      ]}
      process={[
        {
          title: "İhtiyaç Analizi",
          description: "Projenizin gereksinimlerini ve hedef kitlenizi analiz ederiz"
        },
        {
          title: "UI/UX Tasarım",
          description: "Platform özelinde kullanıcı deneyimi ve arayüz tasarımı yaparız"
        },
        {
          title: "Geliştirme",
          description: "Modern teknolojilerle uygulamanızı geliştiririz"
        },
        {
          title: "Test ve Optimizasyon",
          description: "Farklı cihazlarda test ve performans optimizasyonu yaparız"
        },
        {
          title: "Mağaza Yayını",
          description: "App Store ve Google Play mağazalarında yayına alırız"
        }
      ]}
      technologies={[
        "React Native",
        "Swift",
        "Kotlin",
        "Flutter",
        "Firebase",
        "GraphQL",
        "Redux",
        "MobX"
      ]}
      caseStudies={[
        {
          title: "Fintech Uygulaması",
          description: "Mobil bankacılık ve finans yönetimi uygulaması. Güvenli işlemler ve analitik dashboard.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "E-ticaret Uygulaması",
          description: "Mobil alışveriş uygulaması. Gelişmiş arama, filtreleme ve ödeme sistemleri.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Sosyal Medya Uygulaması",
          description: "Fotoğraf ve video paylaşım platformu. Gerçek zamanlı mesajlaşma ve bildirimler.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
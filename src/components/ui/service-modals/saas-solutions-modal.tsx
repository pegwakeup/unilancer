import React from 'react';
import { ServiceDetailModal } from '../service-detail-modal';

interface SaaSSolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaaSSolutionsModal = ({ isOpen, onClose }: SaaSSolutionsModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="SaaS Çözümleri"
      description="İşletmenize özel bulut tabanlı yazılım çözümleri geliştiriyoruz"
      image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Çok kiracılı (multi-tenant) mimari",
        "Otomatik ölçeklendirme",
        "Abonelik yönetimi",
        "API entegrasyonları",
        "Gerçek zamanlı analitikler",
        "Özelleştirilebilir dashboard"
      ]}
      benefits={[
        "Düşük başlangıç maliyeti",
        "Otomatik güncellemeler ve bakım",
        "7/24 erişilebilirlik",
        "Yüksek güvenlik standartları",
        "Kolay ölçeklendirme",
        "Özelleştirilebilir çözümler"
      ]}
      process={[
        {
          title: "İş Analizi",
          description: "İş süreçlerinizi ve ihtiyaçlarınızı detaylı analiz ederiz"
        },
        {
          title: "Mimari Tasarım",
          description: "Ölçeklenebilir ve güvenli sistem mimarisi tasarlarız"
        },
        {
          title: "Geliştirme",
          description: "Modern teknolojilerle çözümünüzü geliştiririz"
        },
        {
          title: "Test ve Optimizasyon",
          description: "Kapsamlı testler ve performans optimizasyonları yaparız"
        },
        {
          title: "Deployment ve Destek",
          description: "Sistemi canlıya alır ve sürekli destek sağlarız"
        }
      ]}
      technologies={[
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Stripe"
      ]}
      caseStudies={[
        {
          title: "CRM Sistemi",
          description: "Özelleştirilebilir müşteri ilişkileri yönetim sistemi. Satış ve pazarlama otomasyonu.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "İK Yönetim Platformu",
          description: "Bulut tabanlı insan kaynakları yönetim sistemi. Performans takibi ve raporlama.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Proje Yönetim Yazılımı",
          description: "Ekip işbirliği ve proje yönetim platformu. Gerçek zamanlı iletişim ve görev takibi.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
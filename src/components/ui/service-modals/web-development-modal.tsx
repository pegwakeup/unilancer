import React from 'react';
import { ServiceDetailModal } from '../service-detail-modal';

interface WebDevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebDevelopmentModal = ({ isOpen, onClose }: WebDevelopmentModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Web Geliştirme"
      description="Modern teknolojiler ve en iyi pratiklerle özel web çözümleri geliştiriyoruz"
      image="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Responsive ve mobil uyumlu tasarım",
        "SEO dostu kod yapısı",
        "Yüksek performans ve hız optimizasyonu",
        "Modern UI/UX deneyimi",
        "Güvenli ve ölçeklenebilir altyapı",
        "API entegrasyonları"
      ]}
      benefits={[
        "Hızlı yüklenen ve performanslı web siteleri ile kullanıcı deneyimini artırın",
        "SEO uyumlu yapı ile arama motorlarında üst sıralarda yer alın",
        "Mobil uyumlu tasarım ile tüm cihazlarda mükemmel görünüm",
        "Güvenli altyapı ile verilerinizi koruyun",
        "Kolay yönetim paneli ile içeriklerinizi güncelleyin",
        "Analitik araçlar ile kullanıcı davranışlarını takip edin"
      ]}
      process={[
        {
          title: "Analiz ve Planlama",
          description: "İhtiyaçlarınızı detaylı analiz eder, proje kapsamını ve hedeflerini belirleriz"
        },
        {
          title: "Tasarım ve Prototip",
          description: "Modern ve kullanıcı dostu arayüz tasarımı oluşturur, onayınıza sunarız"
        },
        {
          title: "Geliştirme",
          description: "En son teknolojileri kullanarak projenizi hayata geçiririz"
        },
        {
          title: "Test ve Optimizasyon",
          description: "Kapsamlı testler ve performans optimizasyonları yaparız"
        },
        {
          title: "Yayına Alma",
          description: "Projenizi güvenli bir şekilde yayına alır ve canlı ortama taşırız"
        }
      ]}
      technologies={[
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "GraphQL",
        "AWS",
        "Docker"
      ]}
      caseStudies={[
        {
          title: "E-ticaret Platformu",
          description: "Modern B2B e-ticaret platformu. Özelleştirilebilir ürün katalogları, gelişmiş arama ve filtreleme özellikleri.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Kurumsal Web Sitesi",
          description: "Şık tasarımlı, çok dilli kurumsal web sitesi. Blog, kariyer ve iletişim modülleri.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "SaaS Uygulaması",
          description: "Bulut tabanlı proje yönetim yazılımı. Gerçek zamanlı işbirliği ve raporlama özellikleri.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
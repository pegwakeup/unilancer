import React from 'react';
import { ServiceDetailModal } from '../../service-detail-modal';

interface PrintGraphicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintGraphicModal = ({ isOpen, onClose }: PrintGraphicModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Basılı & Grafik Tasarım"
      description="İnovatif Basılı Materyal Çözümleri: Profesyonel ve Etkileyici Grafik Tasarım"
      image="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Katalog & Broşür Tasarımı",
        "Ambalaj Tasarımı",
        "Poster & Afiş Tasarımı",
        "Dergi & Kitap Tasarımı",
        "Promosyon Malzemeleri",
        "Fuar Standı Tasarımı"
      ]}
      benefits={[
        "Profesyonel ve etkileyici görünüm",
        "Yüksek baskı kalitesi",
        "Marka tutarlılığı",
        "Hedef kitleye uygun tasarımlar",
        "Ölçülebilir sonuçlar",
        "Rekabette öne çıkma"
      ]}
      process={[
        {
          title: "Brief Alma",
          description: "Müşteri ihtiyaçları ve hedeflerin belirlenmesi"
        },
        {
          title: "Konsept",
          description: "Tasarım konseptlerinin oluşturulması"
        },
        {
          title: "Tasarım",
          description: "Seçilen konseptin detaylı tasarımı"
        },
        {
          title: "Baskı Hazırlık",
          description: "Baskıya uygun dosya hazırlığı"
        },
        {
          title: "Kontrol",
          description: "Prova baskı ve son kontroller"
        }
      ]}
      technologies={[
        "Adobe InDesign",
        "Adobe Illustrator",
        "Adobe Photoshop",
        "CorelDRAW",
        "Affinity Publisher",
        "QuarkXPress"
      ]}
      caseStudies={[
        {
          title: "Ürün Kataloğu",
          description: "Mobilya firması için kapsamlı ürün kataloğu tasarımı",
          image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Ambalaj Tasarımı",
          description: "Gıda markası için yenilikçi ambalaj serisi",
          image: "https://images.unsplash.com/photo-1636955840493-f43a02bfa064?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Dergi Tasarımı",
          description: "Lifestyle dergisi sayfa tasarımları",
          image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
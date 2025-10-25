import React from 'react';
import { ServiceDetailModal } from '../../service-detail-modal';

interface IllustrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Changed to named export to match the import
export const IllustrationModal = ({ isOpen, onClose }: IllustrationModalProps) => {
  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="İllüstrasyon & 3D"
      description="İnovatif İllüstrasyon ve 3D Tasarım Çözümleri: Yaratıcı ve Etkileyici Görsel İçerikler"
      image="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000"
      features={[
        "Dijital İllüstrasyon",
        "Karakter Tasarımı",
        "3D Modelleme",
        "Ürün Render",
        "Mimari Görselleştirme",
        "Animasyon"
      ]}
      benefits={[
        "Özgün ve yaratıcı tasarımlar",
        "Yüksek görsel kalite",
        "Çok yönlü kullanım imkanı",
        "Gerçekçi 3D görseller",
        "Etkileyici sunumlar",
        "Animasyon seçenekleri"
      ]}
      process={[
        {
          title: "Konsept",
          description: "İllüstrasyon konseptinin oluşturulması"
        },
        {
          title: "Eskiz",
          description: "Taslak çizimler ve kompozisyon"
        },
        {
          title: "Detaylı Çizim",
          description: "Ana hatların ve detayların çizimi"
        },
        {
          title: "Renklendirme",
          description: "Renk ve gölgelendirme çalışması"
        },
        {
          title: "Son Rötuşlar",
          description: "Detay ve efekt ekleme"
        }
      ]}
      technologies={[
        "Adobe Illustrator",
        "Procreate",
        "Blender",
        "Cinema 4D",
        "3ds Max",
        "ZBrush"
      ]}
      caseStudies={[
        {
          title: "Karakter Tasarımı",
          description: "Mobil oyun için karakter illüstrasyonları",
          image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "3D Ürün Render",
          description: "Mobilya koleksiyonu için 3D görselleştirme",
          image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Mimari Görselleştirme",
          description: "Lüks konut projesi için 3D render çalışması",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
        }
      ]}
    />
  );
};
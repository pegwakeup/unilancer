import { Check } from "lucide-react";
import { Badge } from "./badge";

function FeatureSectionTop() {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <div className="grid border border-white/10 rounded-xl p-8 grid-cols-1 gap-8 items-start lg:grid-cols-2 bg-dark-light/50 backdrop-blur-sm">
          <div className="flex gap-6 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">Freelancer Ekosistemi</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-2xl lg:text-3xl tracking-tighter max-w-xl text-left font-regular">
                  Beyin Göçü Yerine Hizmet İhracatı
                </h2>
                <p className="text-base lg:text-lg leading-relaxed tracking-tight text-gray-400 max-w-xl text-left">
                  Ülkemizin önemli sorunlarından biri olan beyin göçünü hizmet ihracatı yoluyla azaltıyoruz.
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-4">
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-white text-sm lg:text-base">Güvenilir Ekosistem</p>
                  <p className="text-gray-400 text-xs lg:text-sm">
                    Freelancerlar ve işverenler için güvenli bir platform
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-white text-sm lg:text-base">Profesyonel Yönetim</p>
                  <p className="text-gray-400 text-xs lg:text-sm">
                    Proje süreçlerinde profesyonel destek ve yönetim
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-white text-sm lg:text-base">Global Fırsatlar</p>
                  <p className="text-gray-400 text-xs lg:text-sm">
                    Yurt dışı projeler ile global pazara açılma imkanı
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
              alt="Team Work"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureSectionTop };
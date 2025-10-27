import { Check } from "lucide-react";
import { Badge } from "./badge";

function FeatureSectionBottom() {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <div className="grid border border-slate-200 dark:border-white/10 rounded-xl p-8 grid-cols-1 gap-8 items-start lg:grid-cols-2 bg-white dark:bg-dark-light/50 backdrop-blur-sm">
          <div className="relative aspect-video rounded-xl overflow-hidden order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
              alt="Collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/50 to-transparent" />
          </div>
          <div className="flex gap-6 flex-col order-1 lg:order-2">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">İş Modeli</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-2xl lg:text-3xl tracking-tighter max-w-xl text-left font-regular">
                  Unilance İş Modeli
                </h2>
                <p className="text-base lg:text-lg leading-relaxed tracking-tight text-gray-600 dark:text-gray-400 max-w-xl text-left">
                  Freelancer'lar ve işverenler için yenilikçi bir iş modeli geliştirdik.
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-4">
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-sm lg:text-base">Esnek Çalışma</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">
                    Uzaktan ve hibrit çalışma seçenekleri
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-sm lg:text-base">Adil Kazanç</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">
                    Rekabetçi ve adil ücretlendirme sistemi
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-sm lg:text-base">Sürekli Gelişim</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">
                    Eğitim ve mentorluk destekleri
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureSectionBottom };
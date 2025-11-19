import { Language, getOrCreateTranslation } from './deepl';

export const staticTranslations: Record<string, Record<Language, string>> = {
  'nav.digitall': {
    tr: 'DigitAll',
    en: 'DigitAll'
  },
  'nav.portfolio': {
    tr: 'Portfolyo',
    en: 'Portfolio'
  },
  'nav.about': {
    tr: 'Hakkımızda',
    en: 'About Us'
  },
  'nav.blog': {
    tr: 'Blog',
    en: 'Blog'
  },
  'nav.contact': {
    tr: 'İletişim',
    en: 'Contact'
  },
  'nav.getQuote': {
    tr: 'Teklif Al',
    en: 'Get Quote'
  },
  'nav.joinUs': {
    tr: 'Bize Katıl',
    en: 'Join Us'
  },
  'nav.lightTheme': {
    tr: 'Aydınlık Tema',
    en: 'Light Theme'
  },
  'nav.darkTheme': {
    tr: 'Koyu Tema',
    en: 'Dark Theme'
  },
  'home.hero.badge': {
    tr: "Türkiye'nin Yeni Nesil Freelance Platformu",
    en: "Turkey's Next Generation Freelance Platform"
  },
  'home.hero.title': {
    tr: "Türkiye'nin üniversiteli freelancer ekosistemi",
    en: "Turkey's university freelancer ecosystem"
  },
  'home.hero.description': {
    tr: "Unilancer'da projelerinizi seçilmiş üniversiteli ekipler üretir, deneyimli proje yöneticileri uçtan uca yönetir; siz hem uygun bütçeyle çalışır hem de genç yeteneklerin büyümesine katkı sağlarsınız.",
    en: "At Unilancer, selected university teams produce your projects, experienced project managers manage them end-to-end; you work with an affordable budget while contributing to the growth of young talents."
  },
  'home.hero.students': {
    tr: 'Üniversiteli',
    en: 'Students'
  },
  'home.hero.projects': {
    tr: 'Proje',
    en: 'Projects'
  },
  'home.hero.partners': {
    tr: 'İş Ortağı',
    en: 'Partners'
  },
  'home.hero.startProject': {
    tr: 'Projenizi Başlatalım',
    en: "Let's Start Your Project"
  },
  'home.hero.viewPortfolio': {
    tr: 'Portfolyomuzu İnceleyin',
    en: 'View Our Portfolio'
  },
  'home.partners.title': {
    tr: 'Partnerlerimiz',
    en: 'Our Partners'
  },
  'home.partners.description': {
    tr: 'Güvenilir iş ortaklarımızla birlikte büyüyoruz',
    en: 'Growing together with our trusted business partners'
  },
  'home.cta.title': {
    tr: 'Projenizi Hayata Geçirmeye Hazır mısınız?',
    en: 'Ready to Bring Your Project to Life?'
  },
  'home.cta.description': {
    tr: 'Size özel çözümler için hemen iletişime geçin',
    en: 'Contact us now for customized solutions'
  },
  'home.cta.action': {
    tr: 'Teklif Alın',
    en: 'Get a Quote'
  },
  'footer.about.title': {
    tr: 'Hakkımızda',
    en: 'About'
  },
  'footer.about.description': {
    tr: 'Genç yetenekleri iş dünyasıyla buluşturan yenilikçi platform',
    en: 'Innovative platform connecting young talents with the business world'
  },
  'footer.quick.title': {
    tr: 'Hızlı Linkler',
    en: 'Quick Links'
  },
  'footer.services.title': {
    tr: 'Hizmetlerimiz',
    en: 'Our Services'
  },
  'footer.contact.title': {
    tr: 'İletişim',
    en: 'Contact'
  },
  'footer.rights': {
    tr: 'Tüm hakları saklıdır.',
    en: 'All rights reserved.'
  },
  'service.webDesign': {
    tr: 'Web Tasarım',
    en: 'Web Design'
  },
  'service.3dAr': {
    tr: '3D AR SANAL TUR',
    en: '3D AR VIRTUAL TOUR'
  },
  'service.ecommerce': {
    tr: 'E Ticaret Çözümleri',
    en: 'E-Commerce Solutions'
  },
  'service.marketing': {
    tr: 'Pazarlama & Reklam',
    en: 'Marketing & Advertising'
  },
  'service.ai': {
    tr: 'Yapay Zeka - Digibot',
    en: 'Artificial Intelligence - Digibot'
  },
  'service.development': {
    tr: 'Yazılım Geliştirme',
    en: 'Software Development'
  },
  'service.branding': {
    tr: 'Kurumsal Kimlik & Marka',
    en: 'Corporate Identity & Brand'
  },
  'service.graphics': {
    tr: 'Grafik ve Tasarım',
    en: 'Graphics and Design'
  },
  'service.website': {
    tr: 'Web Sitesi',
    en: 'Website'
  },
  'service.ecommerce.short': {
    tr: 'E-Ticaret',
    en: 'E-Commerce'
  },
  'service.design': {
    tr: 'Tasarım',
    en: 'Design'
  },
  'service.content': {
    tr: 'İçerik',
    en: 'Content'
  },
  'service.seo': {
    tr: 'SEO',
    en: 'SEO'
  }
};

export async function initializeStaticTranslations() {
  const { supabase } = await import('./supabase');

  for (const [key, translations] of Object.entries(staticTranslations)) {
    const trText = translations.tr;
    const enText = translations.en;

    try {
      const { data: existingTr } = await supabase
        .from('translations')
        .select('id')
        .eq('content_key', key)
        .eq('language', 'tr')
        .maybeSingle();

      if (!existingTr) {
        await supabase.from('translations').insert({
          content_key: key,
          language: 'tr',
          translated_text: trText,
          content_hash: generateHash(trText)
        });
      }

      const { data: existingEn } = await supabase
        .from('translations')
        .select('id')
        .eq('content_key', key)
        .eq('language', 'en')
        .maybeSingle();

      if (!existingEn) {
        await supabase.from('translations').insert({
          content_key: key,
          language: 'en',
          translated_text: enText,
          content_hash: generateHash(enText)
        });
      }
    } catch (error) {
      console.error(`Error initializing translation for ${key}:`, error);
    }
  }
}

function generateHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export function getStaticTranslation(key: string, language: Language): string {
  return staticTranslations[key]?.[language] || key;
}

export async function translateAndCache(
  contentKey: string,
  text: string,
  language: Language = 'en'
): Promise<string> {
  if (language === 'tr') {
    return text;
  }

  if (staticTranslations[contentKey]) {
    return staticTranslations[contentKey][language];
  }

  return await getOrCreateTranslation(contentKey, text, language);
}

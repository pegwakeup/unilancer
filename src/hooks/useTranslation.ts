import { useLanguage } from '../contexts/LanguageContext';
import { getStaticTranslation } from '../lib/translations';

export function useTranslation() {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  const t = (key: string, fallback?: string): string => {
    const translation = getStaticTranslation(key, language);
    if (translation !== key) {
      return translation;
    }
    return fallback || key;
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    t
  };
}

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import taTranslation from './locales/ta/translation.json';

// Get saved language from localStorage or default to English
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ta: {
        translation: taTranslation
      }
    },
    lng: savedLanguage, // Default language
    fallbackLng: 'en', // Fallback if translation missing
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import landingPageEn from './en/landingPage.json';
import landingPageAr from './ar/landingPage.json';
import legalEn from './en/legal.json';
import legalAr from './ar/legal.json';
import loginPageEn from './en/loginPage.json';
import loginPageAr from './ar/loginPage.json';

const resources = {
  en: {
    landingPage: landingPageEn,
    legal: legalEn,
    loginPage: loginPageEn,
  },
  ar: {
    landingPage: landingPageAr,
    legal: legalAr,
    loginPage: loginPageAr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['landingPage', 'loginPage'],
    defaultNS: 'landingPage',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      checkWhitelist: true
    },
    supportedLngs: ['en', 'ar'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly'
  });

// Handle RTL for Arabic
i18n.on('languageChanged', (lng) => {
  const isAR = lng.startsWith('ar');
  document.documentElement.dir = isAR ? 'rtl' : 'ltr';
  document.documentElement.lang = isAR ? 'ar' : 'en';
});

// Initialize direction based on detected language
const initialLng = i18n.language || 'en';
const isInitialAR = initialLng.startsWith('ar');
document.documentElement.dir = isInitialAR ? 'rtl' : 'ltr';
document.documentElement.lang = isInitialAR ? 'ar' : 'en';

export default i18n;

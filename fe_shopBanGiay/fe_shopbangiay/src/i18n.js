import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationVI from './locales/vi/translation.json';
import translationJA from './locales/ja/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationEN },
            vi: { translation: translationVI },
            ja: { translation: translationJA },
        },
        lng: localStorage.getItem('language') || 'vi',
        fallbackLng: 'vi',
        interpolation: { escapeValue: false },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

const savedLang = localStorage.getItem('language');
if (savedLang) {
    i18n.changeLanguage(savedLang);
}

export default i18n;

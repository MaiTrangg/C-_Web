import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationVI from './locales/vi/translation.json';
import translationEN from './locales/en/translation.json';
import translationJA from './locales/ja/translation.json';

const resources = {
    vi: { translation: translationVI },
    en: { translation: translationEN },
    ja: { translation: translationJA }
};

i18n
    .use(LanguageDetector) // phát hiện ngôn ngữ từ localStorage / trình duyệt
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi', // nếu không tìm thấy → dùng tiếng Việt

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        },

        interpolation: {
            escapeValue: false // React đã xử lý
        }
    });

export default i18n;

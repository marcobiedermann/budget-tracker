import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from '../../public/locales/en/translation.json';

const language = 'en';
const currency = 'EUR';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation,
    },
  },
  lng: language,
  fallbackLng: language,
  interpolation: {
    escapeValue: false,
  },
});

export { currency, language };
export default i18n;

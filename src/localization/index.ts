/**
 * Configuration for multi-language support using i18next library.
 *
 * @exports translate - Memoized translation function.
 * @exports default - Default i18n instance.
 */
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import memoize from 'lodash/memoize';

import en from './languages/en.json';

// Define language resources
const resources = {
  en: {
    translation: en,
  },
};

// Initialize i18next instance
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Memoized translation function
export const translate = memoize(
  (key: any, config?: any) => i18n.t(key, config),
  (key: string | string[], config?: any) =>
    config ? key + JSON.stringify(config) : key,
);

export default i18n;

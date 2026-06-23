import type { Locale, Translations } from '@astro-v7/shared/utils/i18n';
import { useTranslations } from '@astro-v7/shared/utils/i18n';
import de from './de.js';
import en from './en.js';

const translations: Record<Locale, Translations> = { en, de };

export function t(locale: Locale) {
  return useTranslations(translations[locale]);
}

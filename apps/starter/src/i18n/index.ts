import type { Locale, Translations } from '@astro-v7/shared/utils/i18n';
import { useTranslations } from '@astro-v7/shared/utils/i18n';
import de from './de.js';
import en from './en.js';

// en.ts is the source of truth for keys; de.ts must provide exactly the same set.
export type TranslationKey = keyof typeof en;

const translations: Record<Locale, Translations<TranslationKey>> = { en, de };

export function t(locale: Locale) {
  return useTranslations(translations[locale]);
}

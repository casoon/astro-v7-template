export const defaultLocale = 'en' as const;
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export interface I18nConfig<TLocale extends string = string> {
  defaultLocale: TLocale;
  locales: readonly TLocale[];
}

export interface I18nUtils<TLocale extends string = string> {
  getLocaleFromPath: (pathname: string) => TLocale;
  localePath: (path: string, locale: TLocale) => string;
  switchLocalePath: (pathname: string, newLocale: TLocale) => string;
}

export function createI18nUtils<const TLocales extends readonly string[]>(config: {
  defaultLocale: TLocales[number];
  locales: TLocales;
}): I18nUtils<TLocales[number]> {
  const localeSet = new Set<string>(config.locales);

  function getLocaleFromPath(pathname: string): TLocales[number] {
    const segment = pathname.split('/')[1];
    if (localeSet.has(segment)) {
      return segment as TLocales[number];
    }
    return config.defaultLocale;
  }

  function localePath(path: string, locale: TLocales[number]): string {
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (locale === config.defaultLocale) return clean;
    return `/${locale}${clean}`;
  }

  function switchLocalePath(pathname: string, newLocale: TLocales[number]): string {
    const currentLocale = getLocaleFromPath(pathname);
    let basePath = pathname;

    if (currentLocale !== config.defaultLocale) {
      const prefix = `/${currentLocale}`;
      basePath = pathname === prefix ? '/' : pathname.slice(prefix.length) || '/';
    }

    return localePath(basePath, newLocale);
  }

  return {
    getLocaleFromPath,
    localePath,
    switchLocalePath,
  };
}

const defaultI18nUtils = createI18nUtils({ defaultLocale, locales });

/** Type-safe translation dictionary */
export type Translations = Record<string, string>;

/**
 * Get locale from URL pathname.
 * Returns the locale prefix if present, otherwise the default locale.
 */
export const getLocaleFromPath = defaultI18nUtils.getLocaleFromPath;

/**
 * Build a locale-prefixed path.
 * For the default locale, no prefix is added (clean URLs).
 */
export const localePath = defaultI18nUtils.localePath;

/**
 * Get the alternate path for switching locale.
 * Strips current locale prefix (if any) and adds the new one.
 */
export const switchLocalePath = defaultI18nUtils.switchLocalePath;

/**
 * Create a typed translation helper.
 * Usage: const t = useTranslations(translations.de);
 */
export function useTranslations(dict: Translations) {
  return (key: string): string => {
    return dict[key] ?? key;
  };
}

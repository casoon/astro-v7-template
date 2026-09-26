import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createI18nUtils, useTranslations } from './i18n.js';

const { getLocaleFromPath, localePath, switchLocalePath } = createI18nUtils({
  defaultLocale: 'en',
  locales: ['en', 'de'],
});

describe('getLocaleFromPath', () => {
  it('returns the prefixed locale', () => {
    assert.equal(getLocaleFromPath('/de/'), 'de');
    assert.equal(getLocaleFromPath('/de/contact/'), 'de');
  });

  it('falls back to the default locale', () => {
    assert.equal(getLocaleFromPath('/'), 'en');
    assert.equal(getLocaleFromPath('/contact/'), 'en');
    assert.equal(getLocaleFromPath('/design/'), 'en');
  });
});

describe('localePath', () => {
  it('leaves default-locale paths unprefixed', () => {
    assert.equal(localePath('/contact/', 'en'), '/contact/');
  });

  it('prefixes other locales', () => {
    assert.equal(localePath('/contact/', 'de'), '/de/contact/');
    assert.equal(localePath('/', 'de'), '/de/');
  });

  it('adds a missing leading slash', () => {
    assert.equal(localePath('contact/', 'de'), '/de/contact/');
  });
});

describe('switchLocalePath', () => {
  it('switches from the default locale', () => {
    assert.equal(switchLocalePath('/', 'de'), '/de/');
    assert.equal(switchLocalePath('/blog/welcome/', 'de'), '/de/blog/welcome/');
  });

  it('switches back to the default locale', () => {
    assert.equal(switchLocalePath('/de/', 'en'), '/');
    assert.equal(switchLocalePath('/de', 'en'), '/');
    assert.equal(switchLocalePath('/de/blog/welcome/', 'en'), '/blog/welcome/');
  });

  it('keeps the path when the locale does not change', () => {
    assert.equal(switchLocalePath('/de/contact/', 'de'), '/de/contact/');
  });
});

describe('useTranslations', () => {
  it('looks up keys in the dictionary', () => {
    const t = useTranslations({ 'nav.home': 'Startseite' });
    assert.equal(t('nav.home'), 'Startseite');
  });
});

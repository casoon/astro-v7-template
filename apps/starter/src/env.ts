import { createEnvSchema, validateEnv } from '@astro-v7/shared/utils/env';

export const envSchema = createEnvSchema({
  PUBLIC_SITE_URL: 'https://astro-v7-template.casoon.dev',
  PUBLIC_SITE_NAME: 'Astro v7 Starter',
  PUBLIC_AUTHOR: 'Your Name',
  PUBLIC_LOCALE: 'en',
});

export const env = validateEnv(envSchema, import.meta.env ?? {});

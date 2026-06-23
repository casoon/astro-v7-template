import { createEnvSchema, validateEnv } from '@astro-v7/shared/utils/env';

const envSchema = createEnvSchema({
  PUBLIC_SITE_URL: 'https://astrov7.casoon.dev',
  PUBLIC_SITE_NAME: 'Astro v7 Starter',
  PUBLIC_AUTHOR: 'Your Name',
  PUBLIC_LOCALE: 'en',
});

export const env = validateEnv(envSchema, import.meta.env ?? {});

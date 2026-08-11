import { z } from 'astro/zod';

export const webVitalsMetricSchema = z.object({
  name: z.string(),
  value: z.number(),
  delta: z.number(),
  id: z.string(),
  rating: z.string().optional(),
  navigationType: z.string().optional(),
  timestamp: z.number(),
  attribution: z.record(z.string(), z.unknown()).optional(),
});

export const webVitalsPayloadSchema = z.object({
  metrics: z.array(webVitalsMetricSchema).min(1),
  sessionId: z.string(),
  userId: z.string().optional(),
  timestamp: z.number(),
  url: z.url(),
  userAgent: z.string(),
});

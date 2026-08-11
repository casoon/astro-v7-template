import type { APIRoute } from 'astro';
import { webVitalsPayloadSchema } from '../../../lib/web-vitals';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const parsed = webVitalsPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(null, { status: 400 });
  }

  if (import.meta.env.DEV) {
    console.info('[web-vitals] Received metrics', parsed.data.metrics);
  }

  // Replace this with your database, analytics provider, or queue integration.
  // The route itself intentionally has no platform-specific runtime dependency.
  return new Response(null, { status: 204 });
};

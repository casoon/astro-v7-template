import type { APIRoute } from 'astro';

export const prerender = false;

const pageModules = import.meta.glob('./**/*.{astro,md,mdx}');

function getStaticRoute(file: string): string | undefined {
  const path = file
    .replace(/^\.\//, '/')
    .replace(/\.(astro|md|mdx)$/, '')
    .replace(/\/index$/, '/');

  if (path === '/404' || path === '/500' || path.startsWith('/api/') || path.includes('[')) {
    return undefined;
  }

  return path.endsWith('/') ? path : `${path}/`;
}

function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[character] ?? character
  );
}

/**
 * astro-site-files creates the production sitemap after a build. This route
 * supplies the equivalent static page list only while `astro dev` is running,
 * so the browser-local Web Vitals sitemap pass also works during development.
 */
export const GET: APIRoute = ({ request }) => {
  if (!import.meta.env.DEV) return new Response(null, { status: 404 });

  const origin = new URL(request.url).origin;
  const paths = Object.keys(pageModules)
    .map(getStaticRoute)
    .filter((path): path is string => path !== undefined)
    .sort();
  const entries = paths
    .map((path) => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};

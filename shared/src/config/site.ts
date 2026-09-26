/**
 * Organization profile used for JSON-LD (Organization, WebPage, BlogPosting publisher).
 *
 * DEMO DATA — replace every value before going live. The placeholders are chosen so they
 * can't be mistaken for real contact data: example.com is reserved for documentation
 * (RFC 2606) and 555-01xx numbers are reserved for fictional use.
 */
export const siteProfile = {
  email: 'hello@example.com',
  telephone: '+1-555-0100',
  address: {
    streetAddress: '123 Example Street',
    addressLocality: 'Example City',
    postalCode: '00000',
    addressCountry: 'US',
  },
  sameAs: ['https://github.com/casoon/astro-v7-template'],
  /** Served from each app's `public/` folder. */
  logoPath: '/logo.svg',
  /** First publication of the site — used as WebPage `datePublished`. */
  launchDate: '2026-02-23',
};

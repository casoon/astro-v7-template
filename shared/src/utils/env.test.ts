import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createEnvSchema, validateEnv } from './env.js';

const schema = createEnvSchema({
  PUBLIC_SITE_URL: 'https://example.com',
  PUBLIC_SITE_NAME: 'Example',
  PUBLIC_AUTHOR: 'Jane Doe',
});

describe('validateEnv', () => {
  it('applies defaults for unset variables', () => {
    const env = validateEnv(schema, {});
    assert.equal(env.PUBLIC_SITE_URL, 'https://example.com');
    assert.equal(env.PUBLIC_SITE_NAME, 'Example');
    assert.equal(env.PUBLIC_LOCALE, 'en');
    assert.equal(env.PUBLIC_ENABLE_DARK_MODE, true);
    assert.equal(env.PUBLIC_SECURITY_CONTACT, undefined);
  });

  it('prefers provided values over defaults', () => {
    const env = validateEnv(schema, {
      PUBLIC_SITE_URL: 'https://demo.example.org',
      PUBLIC_ENABLE_DARK_MODE: 'false',
    });
    assert.equal(env.PUBLIC_SITE_URL, 'https://demo.example.org');
    assert.equal(env.PUBLIC_ENABLE_DARK_MODE, false);
  });

  it('accepts mailto: and https: security contacts', () => {
    for (const contact of ['mailto:security@example.com', 'https://example.com/security']) {
      assert.equal(
        validateEnv(schema, { PUBLIC_SECURITY_CONTACT: contact }).PUBLIC_SECURITY_CONTACT,
        contact
      );
    }
  });

  it('rejects invalid values', (t) => {
    t.mock.method(console, 'error', () => {});
    assert.throws(
      () => validateEnv(schema, { PUBLIC_SITE_URL: 'not a url' }),
      /Invalid environment/
    );
    assert.throws(
      () => validateEnv(schema, { PUBLIC_SECURITY_CONTACT: 'security@example.com' }),
      /Invalid environment/
    );
  });
});

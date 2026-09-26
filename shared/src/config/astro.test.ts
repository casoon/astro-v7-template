import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, it } from 'node:test';
import { pathToFileURL } from 'node:url';
import { configEnv, postAuditOptions, securityTxt, viteSsrConfig } from './astro.js';

describe('configEnv', () => {
  const key = 'PUBLIC_CONFIG_ENV_TEST';
  afterEach(() => {
    delete process.env[key];
  });

  function envFile(content: string): URL {
    const file = join(mkdtempSync(join(tmpdir(), 'config-env-')), '.env');
    writeFileSync(file, content);
    return pathToFileURL(file);
  }

  it('reads PUBLIC_* values from the .env file', () => {
    assert.equal(configEnv(envFile(`${key}=from-file\n`))[key], 'from-file');
  });

  it('lets shell variables override the .env file', () => {
    process.env[key] = 'from-shell';
    assert.equal(configEnv(envFile(`${key}=from-file\n`))[key], 'from-shell');
  });

  it('works without a .env file', () => {
    const missing = pathToFileURL(join(tmpdir(), 'does-not-exist', '.env'));
    assert.equal(configEnv(missing)[key], undefined);
  });
});

describe('securityTxt', () => {
  it('is disabled without a contact', () => {
    assert.equal(securityTxt(undefined, 'https://example.com'), undefined);
  });

  it('sets canonical and an Expires date under one year ahead', () => {
    const options = securityTxt('mailto:security@example.com', 'https://example.com');
    assert.ok(options);
    assert.equal(options.canonical, 'https://example.com/.well-known/security.txt');
    const days = (Date.parse(options.expires) - Date.now()) / 86_400_000;
    assert.ok(days > 170 && days < 365, `expires in ${days} days`);
  });
});

describe('viteSsrConfig', () => {
  it('keeps the shared pins and appends app-specific entries', () => {
    const include = viteSsrConfig(['@casoon/astro-webvitals']).optimizeDeps.include;
    assert.ok(include.includes('@astro-v7/shared > zod'));
    assert.equal(include.at(-1), '@casoon/astro-webvitals');
  });
});

describe('postAuditOptions', () => {
  it('passes excludes and on-demand routes through', () => {
    const { rules } = postAuditOptions(['404.html'], ['/contact/']);
    assert.deepEqual(rules.filters.exclude, ['404.html']);
    assert.deepEqual(rules.links.known_routes, ['/contact/']);
  });
});

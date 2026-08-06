/**
 * Template-wide prop-for-that integration.
 * Injects the auto-bootstrap import into every page; the bootstrap itself is a
 * no-op until an element carries a `data-props-for` attribute, so pages that
 * don't use it pay no runtime cost.
 */
export default function propsForThat(options = {}) {
  const { enabled = true } = options;

  return {
    name: 'props-for-that',
    hooks: {
      'astro:config:setup': ({ injectScript, logger }) => {
        if (!enabled) {
          logger.info('props-for-that deaktiviert (enabled: false)');
          return;
        }
        injectScript('page', `import 'prop-for-that/auto';`);
      },
    },
  };
}

/* Sets the theme before first paint (loaded by BaseLayout in @astro-v7/shared). A file
   instead of an inline script: Astro inserts the CSP <meta> after head scripts, so an
   inline one would run outside the policy. 'self' covers this file. */
function getStoredTheme() {
  try {
    const cookieTheme = document.cookie.match(/(?:^|;\s*)theme=(dark|light)(?:;|$)/)?.[1];
    return cookieTheme || localStorage.getItem('theme');
  } catch {
    return null;
  }
}

function applyTheme() {
  document.documentElement.classList.remove('no-js');
  const storedTheme = getStoredTheme();
  if (
    storedTheme === 'dark' ||
    (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

applyTheme();
if (window.__applyThemeHandler) {
  document.removeEventListener('astro:after-swap', window.__applyThemeHandler);
}
window.__applyThemeHandler = applyTheme;
document.addEventListener('astro:after-swap', window.__applyThemeHandler);

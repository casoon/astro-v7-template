<script lang="ts">
import { Moon, Sun } from '@lucide/svelte';

let isDark = $state(false);

$effect(() => {
  isDark = document.documentElement.classList.contains('dark');
});

function toggle() {
  isDark = !isDark;
  document.documentElement.classList.toggle('dark', isDark);
  const theme = isDark ? 'dark' : 'light';

  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API lacks broad browser support
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;

  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Ignore storage failures in restricted browsing contexts.
  }
}
</script>

<button
  onclick={toggle}
  class="theme-toggle"
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  type="button"
>
  {#if isDark}
    <Sun size={20} />
  {:else}
    <Moon size={20} />
  {/if}
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--button-radius);
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    transition: background-color var(--transition-fast), border-color var(--transition-fast);
  }

  .theme-toggle:hover {
    background: var(--color-bg-secondary);
    border-color: var(--color-border-secondary);
  }
</style>

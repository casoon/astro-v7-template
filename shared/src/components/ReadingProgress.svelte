<script lang="ts">
import { onMount } from 'svelte';

let progress = $state(0);

onMount(() => {
  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  window.addEventListener('scroll', update, { passive: true });
  return () => window.removeEventListener('scroll', update);
});
</script>

<div
  class="fixed left-0 top-0 h-0.5 bg-[var(--color-primary)] transition-none"
  style="width: {progress}%; z-index: var(--z-fixed)"
  role="progressbar"
  aria-valuenow={Math.round(progress)}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Reading progress"
></div>

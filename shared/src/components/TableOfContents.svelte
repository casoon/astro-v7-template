<script lang="ts">
import { onMount } from 'svelte';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

let { headings }: { headings: Heading[] } = $props();
let activeId = $state('');

onMount(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId = entry.target.id;
          break;
        }
      }
    },
    { rootMargin: '-10% 0% -80% 0%' }
  );

  for (const h of headings) {
    const el = document.getElementById(h.slug);
    if (el) observer.observe(el);
  }

  return () => observer.disconnect();
});
</script>

{#if headings.length > 0}
  <nav aria-label="Table of contents" class="text-sm">
    <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-text">On this page</p>
    <ul class="list-none space-y-1.5 p-0">
      {#each headings as h}
        <li class={h.depth === 3 ? 'pl-3' : ''}>
          <a
            href={`#${h.slug}`}
            class={[
              'block leading-snug no-underline py-0.5 transition-colors hover:text-text',
              activeId === h.slug ? 'text-text font-medium' : 'text-text-secondary',
            ].join(' ')}
          >
            {h.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

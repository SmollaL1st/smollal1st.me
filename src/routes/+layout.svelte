<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import PointerRing from '$lib/components/PointerRing.svelte';
	import { updateDynamicFavicon } from '$lib/utils/colorExtractor';

	let { children } = $props();

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const applySystemTheme = (isDark: boolean) => {
			document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
			updateDynamicFavicon(undefined, isDark);
		};

		// Initial sync
		applySystemTheme(mediaQuery.matches);

		// Listen to live system/device preference changes
		const listener = (e: MediaQueryListEvent) => applySystemTheme(e.matches);
		mediaQuery.addEventListener('change', listener);

		return () => mediaQuery.removeEventListener('change', listener);
	});
</script>

<PointerRing />
{@render children()}

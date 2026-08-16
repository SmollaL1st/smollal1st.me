<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Logo from '$lib/components/Logo.svelte';

	interface Props {
		onComplete: () => void;
	}
	let { onComplete }: Props = $props();

	let visible = $state(true);

	onMount(() => {
		// Stroke animation (1.1s) + fill (0.4s) + short buffer
		const timer = setTimeout(() => {
			visible = false;
			setTimeout(() => {
				onComplete();
			}, 500);
		}, 1600);

		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div class="splash-container" transition:fade={{ duration: 400 }}>
		<Logo variant="animated" width={130} height={165} class="splash-logo" />
	</div>
{/if}

<style>
	.splash-container {
		position: fixed;
		inset: 0;
		background: var(--bg-color);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	:global(.splash-logo) {
		width: 130px;
		height: 165px;
	}
</style>

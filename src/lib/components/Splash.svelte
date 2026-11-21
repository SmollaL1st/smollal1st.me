<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { ShapeName } from '#lib/utils/shapes.ts';
	import Logo from '#lib/components/Logo.svelte';
	import MorphShape from '#lib/components/MorphShape.svelte';

	interface Props {
		/** Called when the splash starts fading out. */
		onReveal?: () => void;
		/** Called once the splash is fully gone. */
		onComplete: () => void;
	}
	let { onReveal, onComplete }: Props = $props();

	let visible = $state(true);

	// M3 Expressive loading-indicator sequence
	const SEQUENCE: ShapeName[] = ['softBurst', 'cookie9', 'pentagon', 'clover4', 'sunny'];
	let step = $state(0);

	onMount(() => {
		const morph = setInterval(() => (step += 1), 380);

		// Stroke animation (1.1s) + fill (0.4s) + short buffer
		const timer = setTimeout(() => {
			clearInterval(morph);
			visible = false;
			onReveal?.();
			setTimeout(onComplete, 450);
		}, 1600);

		return () => {
			clearInterval(morph);
			clearTimeout(timer);
		};
	});
</script>

{#if visible}
	<div class="splash-container" transition:fade={{ duration: 400 }}>
		<div class="splash-indicator" aria-hidden="true">
			<MorphShape shape={SEQUENCE[step % SEQUENCE.length]} rotation={step * 90} />
		</div>
		<Logo variant="animated" width={110} height={140} class="splash-logo" />
	</div>
{/if}

<style>
	.splash-container {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: grid;
		place-items: center;
		background: var(--md-sys-color-surface);
	}

	.splash-container > :global(*) {
		grid-area: 1 / 1;
	}

	.splash-indicator {
		width: 220px;
		height: 220px;
		color: var(--md-sys-color-primary-container);
		animation: indicator-in 600ms var(--md-sys-motion-spring-fast-spatial) both;
	}

	@keyframes indicator-in {
		from {
			opacity: 0;
			transform: scale(0.4);
		}
	}

	:global(.splash-logo) {
		position: relative;
		width: 110px;
		height: 140px;
		color: var(--md-sys-color-on-primary-container);
	}
</style>

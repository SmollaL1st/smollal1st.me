<script lang="ts">
	let mouseX = $state(-100);
	let mouseY = $state(-100);
	let opacity = $state(0);
	let scale = $state(1);
	let timeout: ReturnType<typeof setTimeout>;

	function mouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
		opacity = 1;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			opacity = 0;
		}, 1000);
	}
</script>

<svelte:window
	onmousemove={mouseMove}
	onmousedown={() => (scale = 1.25)}
	onmouseup={() => (scale = 1)}
/>

<div
	class="pointer-ring"
	style="transform: translateX({mouseX - 15}px) translateY({mouseY -
		15}px) scale({scale}); opacity: {opacity};"
	aria-hidden="true"
></div>

<style>
	.pointer-ring {
		left: 0;
		top: 0;
		height: 30px;
		width: 30px;
		border-radius: 100px;
		border: 1.5px solid var(--md-sys-color-outline);
		position: fixed;
		z-index: 30;
		opacity: 0;
		pointer-events: none;
		transition:
			transform var(--m3-default-spatial),
			opacity var(--m3-slow-effects);
	}

	@media (pointer: coarse) {
		.pointer-ring {
			display: none;
		}
	}
</style>

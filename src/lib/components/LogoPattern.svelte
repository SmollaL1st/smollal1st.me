<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		isHovered?: boolean;
	}

	let { isHovered = false }: Props = $props();

	interface LogoItem {
		id: number;
		x: number;
		y: number;
		rotation: number;
		scale: number;
		opacity: number;
		offsetX: number;
		offsetY: number;
		distance: number;
	}

	let logos = $state<LogoItem[]>([]);
	let prevHovered = $state(false);

	// Generate circular pattern - closer to center = bigger & brighter
	function generatePattern(): LogoItem[] {
		const items: LogoItem[] = [];
		const rings = 6;
		const maxRadius = 500;
		const minRadius = 120;

		let id = 0;

		for (let ring = 0; ring < rings; ring++) {
			const radius = minRadius + (ring * (maxRadius - minRadius)) / (rings - 1);
			const itemsInRing = 8 + ring * 4;
			const angleOffset = ring % 2 === 0 ? 0 : Math.PI / itemsInRing;

			for (let i = 0; i < itemsInRing; i++) {
				const angle = (i / itemsInRing) * Math.PI * 2 + angleOffset;
				const x = Math.cos(angle) * radius;
				const y = Math.sin(angle) * radius;

				const normalizedDistance = ring / (rings - 1);
				const scale = 1.2 - normalizedDistance * 0.7;
				const opacity = 0.35 - normalizedDistance * 0.25;

				items.push({
					id: id++,
					x,
					y,
					rotation: 4,
					scale: scale + (Math.random() - 0.5) * 0.15,
					opacity: opacity + (Math.random() - 0.5) * 0.05,
					offsetX: (Math.random() - 0.5) * 15,
					offsetY: (Math.random() - 0.5) * 15,
					distance: radius
				});
			}
		}
		return items;
	}

	// Shuffle positions slightly when unhover
	function shufflePositions() {
		logos = logos.map((logo) => ({
			...logo,
			offsetX: (Math.random() - 0.5) * 25,
			offsetY: (Math.random() - 0.5) * 25,
			rotation: 4
		}));
	}

	// Initialize on mount
	onMount(() => {
		logos = generatePattern();
	});

	// Watch for hover changes - shuffle when transitioning from hovered to not hovered
	$effect(() => {
		const currentHovered = isHovered;
		if (prevHovered && !currentHovered && logos.length > 0) {
			shufflePositions();
		}
		prevHovered = currentHovered;
	});
</script>

<div class="pattern-container" class:collapsed={isHovered}>
	{#each logos as logo (logo.id)}
		{@const delay = logo.distance / 1500}
		<div 
			class="logo-item"
			style="
				--x: {logo.x + logo.offsetX}px;
				--y: {logo.y + logo.offsetY}px;
				--rotation: {logo.rotation}deg;
				--scale: {logo.scale};
				--opacity: {logo.opacity};
				--delay: {delay}s;
				--distance: {logo.distance}px;"
		>
			<svg viewBox="0 0 128 131" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M94.4085 17.2362L91.4923 18.4546L79.3803 39.4331L67.2683 60.4116L63.8141 58.4173C61.102 56.8515 60.4096 56.3993 60.5662 56.3149C60.6656 56.2674 61.9307 55.6342 63.3584 54.9376L65.9518 53.6552L64.9904 55.3203L64.0366 56.9724L65.5209 57.8293L67.0052 58.6863L78.2087 39.2812C84.3707 28.6083 89.3853 19.8604 89.3448 19.837C89.3043 19.8137 88.1587 20.2711 86.7856 20.8419L84.2939 21.8858L79.4945 30.1985L74.6876 38.5244L56.8391 47.782C47.0156 52.862 38.9046 57.095 38.7901 57.1687C38.6377 57.308 39.8369 58.0354 48.0003 62.7485L57.3915 68.1705L43.9667 91.4854L30.5629 114.795L33.6766 113.079L36.7844 111.342L48.7072 90.6909L60.6299 70.0402L64.0031 71.9877L67.3764 73.9353L64.8926 75.2459C63.5189 75.9737 62.3169 76.5909 62.204 76.6306C62.0988 76.6573 62.4536 75.9182 63.1273 74.7512L64.2477 72.8107L62.5788 71.8996L60.8964 70.9807L49.3496 90.8869C39.6103 107.694 37.8659 110.777 38.1187 110.713C38.2737 110.663 39.703 109.932 41.2967 109.104L44.1645 107.596L48.5097 100.07L52.8473 92.5568L71.2085 82.8783L89.5563 73.1921L80.1473 67.7074L70.7173 62.2281L84.0211 39.1231L97.3038 16.0233L94.4085 17.2362Z"/>
				<path d="M106.479 22.0374C106.252 22.1508 102.384 24.1135 97.8819 26.4267L89.6899 30.613L85.6021 37.6932L81.5143 44.7735L89.9627 40.7353L98.411 36.697L102.661 29.2734C106.655 22.2616 106.877 21.8473 106.479 22.0374Z"/>
				<path d="M45.2982 86.1877C44.8929 86.3909 41.0404 88.3273 36.7405 90.4775L28.9207 94.4242L24.8524 101.533L20.7977 108.649L28.922 104.425C33.3894 102.109 37.295 100.081 37.6083 99.912C38.1642 99.6035 38.2096 99.5249 42.1038 92.7174L46.0301 85.8236L45.2982 86.1877Z"/>
			</svg>
		</div>
	{/each}
</div>

<style>
	.pattern-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
	}

	.logo-item {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 55px;
		height: 55px;
		transform: 
			translate(-50%, -50%)
			translate(var(--x), var(--y))
			rotate(var(--rotation))
			scale(var(--scale));
		opacity: var(--opacity);
		transition: 
			transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.6s ease;
		transition-delay: var(--delay);
		will-change: transform, opacity;
	}

	.logo-item svg {
		width: 100%;
		height: 100%;
		fill: rgba(120, 120, 120, 0.6);
	}

	/* When hovered - logos fly to center (under avatar) */
	.pattern-container.collapsed .logo-item {
		transform: 
			translate(-50%, -50%)
			translate(0px, 0px)
			rotate(4deg)
			scale(0.3);
		opacity: 0;
		transition-delay: calc(var(--delay) * 0.5);
	}

	@media (max-width: 768px) {
		.pattern-container {
			top: -230px;
			transform: translateX(-50%);
		}

		.logo-item {
			width: 50px;
			height: 50px;
		}

		/* Don't collapse on mobile (no hover) */
		.pattern-container.collapsed .logo-item {
			transform: 
				translate(-50%, -50%)
				translate(var(--x), var(--y))
				rotate(var(--rotation))
				scale(var(--scale));
			opacity: var(--opacity);
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { PROFILE, SOCIAL_LINKS } from '#lib/data/profile.ts';
	import { HERO_RADIAL_PATTERN } from '#lib/data/heroPattern.ts';
	import { extractColorFromImage, applyDynamicM3Palette } from '#lib/utils/colorExtractor.ts';
	import type { ShapeName } from '#lib/utils/shapes.ts';
	import TechIcon from '#lib/components/TechIcon.svelte';
	import Logo from '#lib/components/Logo.svelte';
	import MorphShape from '#lib/components/MorphShape.svelte';

	interface Props {
		/** Becomes true when the splash screen starts fading — triggers the entrance animation. */
		revealed?: boolean;
	}

	let { revealed = false }: Props = $props();

	// 3D tilt
	let tiltX = $state(0);
	let tiltY = $state(0);
	let isHovered = $state(false);

	// Tap the avatar to morph it through the M3 Expressive shape set
	const AVATAR_SHAPES: ShapeName[] = [
		'cookie9',
		'clover4',
		'sunny',
		'pentagon',
		'cookie6',
		'softBurst',
		'square',
		'flower'
	];
	let shapeIndex = $state(0);
	let avatarRotation = $state(0);
	const avatarShape = $derived(AVATAR_SHAPES[shapeIndex]);

	onMount(async () => {
		try {
			const palette = await extractColorFromImage(PROFILE.avatarUrl);
			applyDynamicM3Palette(palette);
		} catch (e) {
			console.error('Dynamic M3 palette generation error:', e);
		}
	});

	function handleMouseMove(e: MouseEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		tiltX = -((e.clientY - rect.top - centerY) / centerY) * 10;
		tiltY = ((e.clientX - rect.left - centerX) / centerX) * 10;
	}

	function handleMouseLeave() {
		isHovered = false;
		tiltX = 0;
		tiltY = 0;
	}

	function morphAvatar() {
		shapeIndex = (shapeIndex + 1) % AVATAR_SHAPES.length;
		avatarRotation += 45;
	}

	function scrollToProjects() {
		document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
	}

	// Title letters with custom kinetic styles
	const titleLetters = [
		{ char: 'S', isSpecial: false },
		{ char: 'm', isSpecial: true },
		{ char: 'o', isSpecial: false },
		{ char: '/', isSpecial: true },
		{ char: '/', isSpecial: false },
		{ char: 'a', isSpecial: false },
		{ char: ' ', isSpecial: false },
		{ char: 'L', isSpecial: true },
		{ char: '!', isSpecial: false },
		{ char: 's', isSpecial: false },
		{ char: 't', isSpecial: true }
	];
</script>

<section id="home" class="hero-section wrapper" class:revealed>
	<div class="hero-content">
		<h1 class="hero-title" aria-label={PROFILE.name}>
			{#each titleLetters as item, i}
				{#if item.char === ' '}
					<span class="hero-space" aria-hidden="true">&nbsp;</span>
				{:else}
					<span
						class="hero-char"
						class:special={item.isSpecial}
						style="--char-index: {i}"
						aria-hidden="true"
					>
						{item.char}
					</span>
				{/if}
			{/each}
		</h1>

		<!-- M3 Expressive standard button group: the pressed button widens -->
		<div class="m3-btn-group socials">
			{#each SOCIAL_LINKS as link}
				<a
					href={link.url}
					target="_blank"
					rel="external noopener noreferrer"
					class="m3-icon-btn m social-btn"
					title={link.name}
					aria-label={link.name}
				>
					<TechIcon name={link.icon} size={22} />
				</a>
			{/each}
		</div>

		<button type="button" class="m3-btn filled m cta-button" onclick={scrollToProjects}>
			<span>Explore my work</span>
			<span class="m3-icon cta-icon" aria-hidden="true">arrow_downward</span>
		</button>
	</div>

	<div class="hero-visual">
		<div
			class="tilt-stage"
			role="presentation"
			onmousemove={handleMouseMove}
			onmouseenter={() => (isHovered = true)}
			onmouseleave={handleMouseLeave}
		>
			<!-- Radial logo pattern -->
			<div
				class="pattern-grid"
				style="transform: perspective(900px) rotateX({tiltX * 0.35}deg) rotateY({tiltY * 0.35}deg);"
			>
				{#each HERO_RADIAL_PATTERN as item}
					<div
						class="pattern-item"
						style="--px: {item.x}px; --py: {item.y}px; --p-opacity: {item.opacity}; --p-size: {item.size}px; --anim-delay: {item.animDelay}s;"
					>
						<Logo variant="fill" class="pattern-svg" />
					</div>
				{/each}
			</div>

			<!-- Slowly spinning backdrop shape -->
			<div
				class="avatar-backdrop"
				style="transform: perspective(900px) rotateX({tiltX * 0.6}deg) rotateY({tiltY * 0.6}deg);"
			>
				<MorphShape shape="softBurst" spin={6} />
			</div>

			<!-- Avatar clipped into a morphing M3 shape -->
			<button
				type="button"
				class="avatar-button"
				onclick={morphAvatar}
				aria-label="Morph avatar shape"
				style="transform: perspective(900px) rotateX({tiltX}deg) rotateY({tiltY}deg) scale({isHovered
					? 1.03
					: 1});"
			>
				<MorphShape
					shape={avatarShape}
					rotation={avatarRotation + (isHovered ? 12 : 0)}
					image={PROFILE.avatarUrl}
					alt={PROFILE.name}
					frame={4}
				/>
			</button>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		align-items: center;
		gap: 48px;
		min-height: 90vh;
		padding-block: 112px 64px;
	}

	.hero-content {
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 28px;
	}

	/* ---------- Kinetic display type (Google Sans Flex variable axes) ---------- */

	.hero-title {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		font-family: var(--md-ref-typeface-brand);
		font-size: clamp(3.5rem, 9vw, 7.25rem);
		font-weight: 650;
		line-height: 0.95;
		letter-spacing: -0.035em;
		color: var(--md-sys-color-on-surface);
	}

	.hero-char {
		--wght: 650;
		--wdth: 100;
		--rond: 20;
		--slnt: 0;
		display: inline-block;
		transform-origin: 50% 90%;
		font-variation-settings:
			'wght' var(--wght),
			'wdth' var(--wdth),
			'ROND' var(--rond),
			'slnt' var(--slnt),
			'opsz' 144;
		transition:
			transform var(--m3-fast-spatial),
			color var(--m3-default-effects),
			font-variation-settings var(--m3-default-spatial);
	}

	.hero-char.special {
		--wght: 800;
		--rond: 100;
		--slnt: -10;
		color: var(--md-sys-color-primary);
	}

	.hero-char:hover {
		--wght: 950;
		--wdth: 125;
		--rond: 100;
		transform: translateY(-0.08em) rotate(-3deg);
		color: var(--md-sys-color-tertiary);
	}

	.hero-space {
		display: inline-block;
		width: 0.26em;
	}

	/* Entrance: letters spring up while their weight & width "inflate" */
	.revealed .hero-char {
		animation: char-rise 900ms var(--md-sys-motion-spring-fast-spatial) backwards;
		animation-delay: calc(var(--char-index) * 45ms);
	}

	@keyframes char-rise {
		from {
			opacity: 0;
			transform: translateY(0.45em) scale(0.7);
			font-variation-settings:
				'wght' 100,
				'wdth' 50,
				'ROND' 100,
				'slnt' 0,
				'opsz' 144;
		}
	}

	.revealed .socials,
	.revealed .cta-button {
		animation: fade-up 700ms var(--md-sys-motion-spring-default-spatial) backwards;
		animation-delay: 420ms;
	}

	.revealed .cta-button {
		animation-delay: 520ms;
	}

	@keyframes fade-up {
		from {
			opacity: 0;
			translate: 0 24px;
		}
	}

	/* ---------- Socials & CTA ---------- */

	.social-btn {
		--_bg: var(--md-sys-color-surface-container-high);
		--_fg: var(--md-sys-color-on-surface);
	}

	.social-btn:hover {
		--_bg: var(--md-sys-color-tertiary-container);
		--_fg: var(--md-sys-color-on-tertiary-container);
		border-radius: var(--_square);
	}

	.social-btn:active {
		border-radius: var(--_pressed);
	}

	.cta-button {
		padding-inline: 28px 24px;
	}

	.cta-icon {
		transition: transform var(--m3-fast-spatial);
	}

	.cta-button:hover {
		border-radius: var(--_square);
	}

	.cta-button:hover .cta-icon {
		transform: translateY(3px);
	}

	.cta-button:active {
		border-radius: var(--_pressed);
	}

	/* ---------- Avatar stage ---------- */

	.hero-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 40px;
	}

	.tilt-stage {
		--avatar-size: 340px;
		position: relative;
		display: grid;
		place-items: center;
		width: var(--avatar-size);
		height: var(--avatar-size);
	}

	.pattern-grid {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		z-index: 0;
		pointer-events: none;
		transition: transform 0.2s ease-out;
	}

	.pattern-item {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--p-size, 36px);
		height: calc(var(--p-size, 36px) * (374 / 295));
		color: var(--md-sys-color-primary);
		opacity: var(--p-opacity);
		transform: translate(calc(-50% + var(--px)), calc(-50% + var(--py))) rotate(-18deg);
		animation: logo-float 4.5s ease-in-out infinite;
		animation-delay: var(--anim-delay, 0s);
		transition: color var(--m3-slow-effects);
	}

	:global(.pattern-svg) {
		display: block;
		width: 100%;
		height: 100%;
	}

	@keyframes logo-float {
		0%,
		100% {
			translate: 0 0;
		}
		50% {
			translate: 0 -4px;
		}
	}

	.avatar-backdrop {
		position: absolute;
		inset: -13%;
		z-index: 1;
		color: var(--md-sys-color-surface-container-high);
		pointer-events: none;
		transition:
			transform 0.2s ease-out,
			color var(--m3-slow-effects);
	}

	.avatar-button {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		background: none;
		color: var(--md-sys-color-primary);
		cursor: pointer;
		transform-style: preserve-3d;
		transition: transform 0.15s ease-out;
	}

	.avatar-button :global(svg) {
		width: 100%;
		height: 100%;
		filter: drop-shadow(0 12px 32px rgb(0 0 0 / 0.18));
	}

	.avatar-button:focus-visible {
		outline: none;
	}

	.avatar-button:focus-visible :global(svg) {
		filter: drop-shadow(0 0 0 var(--md-sys-color-secondary))
			drop-shadow(0 0 4px var(--md-sys-color-secondary));
	}

	@media (max-width: 868px) {
		.hero-section {
			grid-template-columns: 1fr;
			gap: 32px;
			min-height: auto;
			padding-block: 48px 40px;
		}

		.hero-visual {
			order: -1;
			padding-block: 32px 8px;
		}

		.tilt-stage {
			--avatar-size: 250px;
		}

		.pattern-item {
			transform: translate(calc(-50% + var(--px) * 0.72), calc(-50% + var(--py) * 0.72))
				rotate(-18deg);
		}
	}
</style>

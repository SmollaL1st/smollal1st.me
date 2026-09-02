<script lang="ts">
	import { onMount } from 'svelte';
	import { PROFILE, SOCIAL_LINKS } from '$lib/data/profile';
	import { HERO_RADIAL_PATTERN } from '$lib/data/heroPattern';
	import { extractColorFromImage, applyDynamicM3Palette } from '$lib/utils/colorExtractor';
	import TechIcon from '$lib/components/TechIcon.svelte';
	import Logo from '$lib/components/Logo.svelte';

	// 3D Avatar Tilt State
	let tiltX = $state(0);
	let tiltY = $state(0);
	let isHovered = $state(false);

	onMount(async () => {
		try {
			const palette = await extractColorFromImage(PROFILE.avatarUrl);
			applyDynamicM3Palette(palette);
		} catch (e) {
			console.error('Dynamic Monet palette generation error:', e);
		}
	});

	function handleMouseMove(e: MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		tiltX = -((y - centerY) / centerY) * 10;
		tiltY = ((x - centerX) / centerX) * 10;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
		tiltX = 0;
		tiltY = 0;
	}

	function scrollToAbout() {
		const el = document.getElementById('projects');
		if (el) el.scrollIntoView({ behavior: 'smooth' });
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

<section id="home" class="hero-section wrapper">
	<div class="hero-content">
		<!-- Kinetic Typography Heading -->
		<h1 class="hero-title" aria-label={PROFILE.name}>
			{#each titleLetters as item, i}
				{#if item.char === ' '}
					<span class="hero-space" aria-hidden="true">&nbsp;</span>
				{:else}
					<span class="hero-char" class:special={item.isSpecial} style="--char-index: {i}">
						{item.char}
					</span>
				{/if}
			{/each}
		</h1>

		<!-- Role & Subtitle -->
		<p class="hero-role">{PROFILE.role}</p>
		<p class="hero-desc">{PROFILE.subtitle}</p>

		<!-- Social Links Row -->
		<div class="socials-row">
			{#each SOCIAL_LINKS as link}
				<a
					href={link.url}
					target="_blank"
					rel="external noopener noreferrer"
					class="social-btn"
					title={link.name}
					aria-label={link.name}
				>
					<TechIcon name={link.icon} size={20} />
				</a>
			{/each}
		</div>

		<!-- Expressive M3E CTA Button with Dynamic Shape Morphing -->
		<button type="button" class="cta-button" onclick={scrollToAbout}>
			<span>Explore my work</span>
			<span class="cta-arrow" aria-hidden="true">↓</span>
		</button>
	</div>

	<!-- Square Squircle Avatar with Authentic Telegram Radial Logos Pattern -->
	<div class="hero-avatar-wrapper">
		<div
			class="tilt-card-container"
			role="presentation"
			onmousemove={handleMouseMove}
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			<!-- Circular Radial Pattern Grid -->
			<div
				class="patern-logo-grid"
				style="
					transform: perspective(900px) rotateX({tiltX * 0.35}deg) rotateY({tiltY * 0.35}deg);
				"
			>
				{#each HERO_RADIAL_PATTERN as item}
					<div
						class="pattern-item"
						style="
							--px: {item.x}px;
							--py: {item.y}px;
							--p-opacity: {item.opacity};
							--p-size: {item.size}px;
							--anim-delay: {item.animDelay}s;
						"
					>
						<Logo variant="fill" class="pattern-svg" />
					</div>
				{/each}
			</div>

			<!-- Square 1:1 Avatar Card (Flat, No Shadows) -->
			<div
				class="tilt-card"
				style="
					transform: perspective(900px) rotateX({tiltX}deg) rotateY({tiltY}deg) scale3d({isHovered
					? 1.02
					: 1}, {isHovered ? 1.02 : 1}, 1);
				"
			>
				<img
					src={PROFILE.avatarUrl}
					alt={PROFILE.name}
					class="avatar-image"
					loading="eager"
					crossorigin="anonymous"
				/>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		min-height: 88vh;
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		align-items: center;
		gap: 50px;
		padding-top: 100px;
		padding-bottom: 60px;
		position: relative;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
		z-index: 2;
	}

	/* Kinetic Typography Heading */
	.hero-title {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 2px;
		font-size: clamp(3.2rem, 8vw, 6.2rem);
		font-weight: 700;
		letter-spacing: -0.07em;
		line-height: 0.95;
		color: var(--text-primary);
		user-select: none;
	}

	.hero-char {
		display: inline-block;
		transition:
			transform 0.35s var(--bezier-bounce),
			color 0.3s ease;
		transform-origin: bottom center;
	}

	.hero-space {
		display: inline-block;
		width: 0.28em;
	}

	.hero-char:hover {
		transform: translateY(-8px) scale(1.15) rotate(2deg);
		color: var(--accent);
	}

	.hero-char.special {
		font-style: italic;
		color: var(--accent);
	}

	.hero-char.special:hover {
		transform: translateY(-10px) scale(1.22) rotate(-4deg);
	}

	.hero-role {
		font-size: clamp(1.3rem, 2.5vw, 1.85rem);
		font-weight: 400;
		color: var(--text-secondary);
		letter-spacing: -0.03em;
		line-height: 1.3;
	}

	.hero-desc {
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		color: var(--text-tertiary);
		max-width: 34rem;
		line-height: 1.65;
	}

	/* Socials Row */
	.socials-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin-top: 6px;
	}

	.social-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 46px;
		height: 46px;
		border-radius: var(--radius-md);
		background-color: var(--surface-container);
		color: var(--text-primary);
		box-shadow: none;
		transition:
			transform 0.25s var(--bezier-bounce),
			background-color 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.social-btn:hover {
		transform: translateY(-3px) scale(1.06);
		background-color: var(--accent-container);
		color: var(--on-accent-container);
		border-color: var(--accent);
	}

	/* Expressive M3E CTA Button with Dynamic Shape-Morphing */
	.cta-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: 16px;
		width: fit-content;
		padding: 16px 32px;
		border-radius: 16px;
		border: none;
		outline: none;
		background-color: var(--surface-container-high);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		cursor: pointer;
		box-shadow: none;
		position: relative;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		transition:
			border-radius 0.35s var(--bezier-bounce),
			transform 0.25s var(--bezier-bounce),
			background-color 0.25s ease,
			color 0.2s ease;
	}

	.cta-arrow {
		display: inline-block;
		font-size: 1.15rem;
		line-height: 1;
		transition: transform 0.25s var(--bezier-bounce);
	}

	.cta-button:hover {
		border-radius: 26px 14px 26px 14px;
		transform: translateY(-3px);
		background-color: var(--accent-container);
		color: var(--on-accent-container);
	}

	.cta-button:hover .cta-arrow {
		transform: translateY(3px);
	}

	.cta-button:active {
		border-radius: 24px;
		transform: translateY(0) scale(0.97);
		background-color: var(--accent-container);
	}

	/* Square Avatar with Radial Circular LogoV2 Pattern */
	.hero-avatar-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 40px 0;
	}

	.tilt-card-container {
		perspective: 900px;
		cursor: grab;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Circular Radial Pattern Grid */
	.patern-logo-grid {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		pointer-events: none;
		z-index: 1;
		transition: transform 0.2s ease-out;
	}

	.pattern-item {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--p-size, 36px);
		height: calc(var(--p-size, 36px) * (374 / 295));
		color: var(--accent);
		opacity: var(--p-opacity);
		transform: translate(calc(-50% + var(--px)), calc(-50% + var(--py))) rotate(-18deg);
		animation: logoGentleFloat 4.5s ease-in-out infinite;
		animation-delay: var(--anim-delay, 0s);
		transition:
			color 0.3s ease,
			opacity 0.3s ease;
	}

	:global(.pattern-svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	@keyframes logoGentleFloat {
		0%,
		100% {
			translate: 0 0px;
		}
		50% {
			translate: 0 -4px;
		}
	}

	/* Square 1:1 Tilt Card */
	.tilt-card {
		position: relative;
		width: 320px;
		height: 320px;
		aspect-ratio: 1 / 1;
		border-radius: 90px;
		overflow: hidden;
		background-color: var(--surface-container);
		box-shadow: none;
		z-index: 2;
		transition: transform 0.15s ease-out;
		transform-style: preserve-3d;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: contrast(1.02) saturate(1.04);
	}

	@media (max-width: 868px) {
		.hero-section {
			grid-template-columns: 1fr;
			padding-top: 60px;
			gap: 40px;
			text-align: left;
		}

		.hero-avatar-wrapper {
			order: -1;
			justify-content: center;
			padding: 25px 0;
		}

		.tilt-card {
			width: 250px;
			height: 250px;
			border-radius: 70px;
		}

		.pattern-item {
			transform: translate(calc(-50% + var(--px) * 0.72), calc(-50% + var(--py) * 0.72))
				rotate(-18deg);
		}
	}
</style>

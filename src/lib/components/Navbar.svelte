<script lang="ts">
	import { onMount } from 'svelte';
	import { NAV_ITEMS } from '#lib/data/profile.ts';

	let activeSection = $state('/');
	let isScrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			isScrolled = scrollY > 20;

			// Instant top of page detection
			if (scrollY < 140) {
				activeSection = '/';
				return;
			}

			const aboutEl = document.getElementById('about');
			const projectsEl = document.getElementById('projects');

			// Mid-viewport trigger line (35% from top of screen)
			const scrollPosition = scrollY + window.innerHeight * 0.35;

			if (projectsEl && scrollPosition >= projectsEl.offsetTop) {
				activeSection = 'projects';
			} else if (aboutEl && scrollPosition >= aboutEl.offsetTop) {
				activeSection = 'about';
			} else {
				activeSection = '/';
			}
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});

	function scrollToSection(e: MouseEvent, href: string) {
		e.preventDefault();
		const targetId = href.replace('#', '');
		const targetEl = document.getElementById(targetId);
		if (targetEl) {
			activeSection = targetId === 'home' ? '/' : targetId;
			targetEl.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- Desktop / tablet: M3 Expressive floating toolbar that gathers into a pill on scroll -->
<header class="top-bar desktop-only" class:scrolled={isScrolled}>
	<nav class="toolbar" aria-label="Main navigation">
		{#each NAV_ITEMS as item (item.href)}
			{@const isActive =
				(item.label === '/' && activeSection === '/') || activeSection === item.label}
			<a
				href={item.href}
				class="toolbar-item"
				class:selected={isActive}
				class:slash-item={item.label === '/'}
				onclick={(e) => scrollToSection(e, item.href)}
				aria-current={isActive ? 'page' : undefined}
				aria-label={item.label === '/' ? 'home' : undefined}
			>
				{#if item.label === '/'}
					<span class="slash-kinetic-group" aria-hidden="true">
						<span class="slash-char">/</span>
						<span class="slash-char companion" class:morph={isActive}>/</span>
					</span>
				{:else}
					<span class="toolbar-label">{item.label}</span>
				{/if}
			</a>
		{/each}
	</nav>
</header>

<!-- Mobile: M3 Expressive navigation bar -->
<nav class="nav-bar mobile-only" aria-label="Mobile navigation">
	{#each NAV_ITEMS as item (item.href)}
		{@const isActive =
			(item.label === '/' && activeSection === '/') || activeSection === item.label}
		<a
			href={item.href}
			class="nav-bar-item"
			class:selected={isActive}
			onclick={(e) => scrollToSection(e, item.href)}
			aria-current={isActive ? 'page' : undefined}
		>
			<span class="nav-bar-indicator">
				<span class="m3-icon" aria-hidden="true">{item.icon}</span>
			</span>
			<span class="nav-bar-label">{item.label === '/' ? 'home' : item.label}</span>
		</a>
	{/each}
</nav>

<style>
	.desktop-only {
		display: flex;
	}

	.mobile-only {
		display: none;
	}

	/* ---------- Floating toolbar (desktop) ---------- */

	.top-bar {
		position: fixed;
		top: 28px;
		left: 0;
		right: 0;
		z-index: 100;
		justify-content: center;
		padding-inline: 16px;
		pointer-events: none;
		transition: top var(--m3-slow-spatial);
	}

	.top-bar.scrolled {
		top: 16px;
	}

	.toolbar {
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		gap: 20px;
		padding: 8px;
		border-radius: var(--md-sys-shape-corner-full);
		background-color: transparent;
		box-shadow: none;
		transition:
			gap var(--m3-slow-spatial),
			padding var(--m3-slow-spatial),
			background-color var(--m3-default-effects),
			box-shadow var(--m3-default-effects),
			backdrop-filter var(--m3-default-effects);
	}

	.scrolled .toolbar {
		gap: 4px;
		padding: 6px;
		background-color: color-mix(
			in srgb,
			var(--md-sys-color-surface-container-high) 86%,
			transparent
		);
		box-shadow: var(--md-sys-elevation-level3);
		backdrop-filter: blur(20px) saturate(160%);
		-webkit-backdrop-filter: blur(20px) saturate(160%);
	}

	.toolbar-item {
		--_h: 48px;
		position: relative;
		isolation: isolate;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: var(--_h);
		min-width: 56px;
		padding-inline: 20px;
		border-radius: calc(var(--_h) / 2);
		color: var(--md-sys-color-on-surface-variant);
		font: var(--md-sys-typescale-title-medium);
		font-size: 1.0625rem;
		font-variation-settings:
			'wght' 500,
			'ROND' 0;
		transition:
			color var(--m3-default-effects),
			height var(--m3-slow-spatial),
			padding var(--m3-fast-spatial),
			border-radius var(--m3-fast-spatial),
			font-variation-settings var(--m3-default-spatial);
	}

	.scrolled .toolbar-item {
		--_h: 44px;
		padding-inline: 18px;
	}

	/* Active indicator (springs in from the centre) */
	.toolbar-item::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -2;
		border-radius: inherit;
		background-color: var(--md-sys-color-primary);
		opacity: 0;
		transform: scale(0.5, 0.7);
		transition:
			transform var(--m3-fast-spatial),
			opacity var(--m3-fast-effects);
	}

	/* State layer */
	.toolbar-item::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: inherit;
		background-color: currentColor;
		opacity: 0;
		transition: opacity var(--m3-fast-effects);
	}

	.toolbar-item:hover {
		color: var(--md-sys-color-on-surface);
	}

	.toolbar-item:hover::before {
		opacity: var(--md-sys-state-hover-state-layer-opacity);
	}

	.toolbar-item:active::before {
		opacity: var(--md-sys-state-pressed-state-layer-opacity);
	}

	.toolbar-item.selected {
		color: var(--md-sys-color-on-primary);
		font-variation-settings:
			'wght' 700,
			'ROND' 100;
	}

	.toolbar-item.selected::after {
		opacity: 1;
		transform: none;
	}

	/* Button-group behaviour: pressed item widens & squares off, neighbours make room */
	.toolbar-item:active {
		padding-inline: 26px;
		border-radius: var(--md-sys-shape-corner-medium);
	}

	.toolbar:has(.toolbar-item:active) .toolbar-item:not(:active) {
		padding-inline: 14px;
	}

	.toolbar-label {
		line-height: 1;
	}

	/* Kinetic '/' → '//' morph for the home item */
	.slash-kinetic-group {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		line-height: 1;
	}

	.slash-char {
		display: inline-block;
		line-height: 1;
	}

	.slash-char.companion {
		width: 0;
		max-width: 0;
		opacity: 0;
		overflow: hidden;
		transform: translate(-4px, 12px) rotate(60deg) scale(0.2);
		transform-origin: center bottom;
		transition:
			transform var(--m3-fast-spatial),
			opacity var(--m3-fast-effects),
			max-width var(--m3-fast-spatial),
			width var(--m3-fast-spatial);
	}

	.slash-char.companion.morph {
		width: auto;
		max-width: 1em;
		opacity: 1;
		transform: none;
	}

	/* ---------- Navigation bar (mobile) ---------- */

	@media (max-width: 768px) {
		.desktop-only {
			display: none;
		}

		.mobile-only {
			display: flex;
		}

		.nav-bar {
			position: fixed;
			inset: auto 0 0 0;
			z-index: 1000;
			justify-content: center;
			gap: 8px;
			padding: 0 8px env(safe-area-inset-bottom, 0px);
			background-color: var(--md-sys-color-surface-container);
		}

		.nav-bar-item {
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 4px;
			max-width: 168px;
			height: 64px;
			color: var(--md-sys-color-on-surface-variant);
			transition: color var(--m3-default-effects);
		}

		.nav-bar-indicator {
			position: relative;
			isolation: isolate;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 56px;
			height: 32px;
			border-radius: var(--md-sys-shape-corner-large);
		}

		.nav-bar-indicator::after {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -2;
			border-radius: inherit;
			background-color: var(--md-sys-color-secondary-container);
			opacity: 0;
			transform: scaleX(0.32);
			transition:
				transform var(--m3-fast-spatial),
				opacity var(--m3-fast-effects);
		}

		.nav-bar-indicator::before {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			border-radius: inherit;
			background-color: currentColor;
			opacity: 0;
			transition: opacity var(--m3-fast-effects);
		}

		.nav-bar-item:active .nav-bar-indicator::before {
			opacity: var(--md-sys-state-pressed-state-layer-opacity);
		}

		.nav-bar-item.selected {
			color: var(--md-sys-color-secondary);
		}

		.nav-bar-item.selected .nav-bar-indicator {
			color: var(--md-sys-color-on-secondary-container);
		}

		.nav-bar-item.selected .nav-bar-indicator::after {
			opacity: 1;
			transform: none;
		}

		.nav-bar-item.selected .m3-icon {
			--icon-fill: 1;
			--icon-wght: 500;
		}

		.nav-bar-label {
			font: var(--md-sys-typescale-label-medium);
			transition: font-weight var(--m3-default-effects);
		}

		.nav-bar-item.selected .nav-bar-label {
			font-weight: 700;
		}
	}

	@media (hover: hover) and (max-width: 768px) {
		.nav-bar-item:hover .nav-bar-indicator::before {
			opacity: var(--md-sys-state-hover-state-layer-opacity);
		}
	}
</style>

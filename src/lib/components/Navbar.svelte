<script lang="ts">
	import { onMount } from 'svelte';
	import { NAV_ITEMS } from '$lib/data/profile';

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

<!-- Desktop / Tablet Top Navigation with Magnetic Retraction -->
<header class="navbar-wrapper desktop-only" class:is-scrolled={isScrolled}>
	<nav class="md3e-nav-group" class:scrolled={isScrolled} aria-label="Main Navigation">
		{#each NAV_ITEMS as item (item.href)}
			{@const isActive =
				(item.label === '/' && activeSection === '/') || activeSection === item.label}
			<a
				href={item.href}
				class="nav-btn"
				class:is-active={isActive}
				class:is-slash-item={item.label === '/'}
				onclick={(e) => scrollToSection(e, item.href)}
				aria-current={isActive ? 'page' : undefined}
			>
				{#if item.label === '/'}
					<span class="slash-kinetic-group">
						<span class="slash-char main">/</span>
						<span class="slash-char companion" class:morph={isActive}>/</span>
					</span>
				{:else}
					<span class="btn-label">{item.label}</span>
				{/if}
			</a>
		{/each}
	</nav>
</header>

<!-- Mobile Standard Android Material 3 Bottom Navigation Bar -->
<nav class="mobile-m3-nav mobile-only" aria-label="Mobile Navigation">
	<div class="m3-bar-inner">
		{#each NAV_ITEMS as item (item.href)}
			{@const isActive =
				(item.label === '/' && activeSection === '/') || activeSection === item.label}
			<a
				href={item.href}
				class="m3-nav-item"
				class:is-active={isActive}
				onclick={(e) => scrollToSection(e, item.href)}
				aria-current={isActive ? 'page' : undefined}
			>
				<div class="m3-icon-pill" class:active-pill={isActive}>
					{#if item.icon === 'home' || item.label === '/'}
						<svg
							viewBox="0 0 24 24"
							width="25"
							height="25"
							fill="none"
							stroke="currentColor"
							stroke-width={isActive ? '2.5' : '2'}
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
					{:else if item.icon === 'user' || item.label === 'about'}
						<svg
							viewBox="0 0 24 24"
							width="25"
							height="25"
							fill="none"
							stroke="currentColor"
							stroke-width={isActive ? '2.5' : '2'}
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
					{:else}
						<svg
							viewBox="0 0 24 24"
							width="25"
							height="25"
							fill="none"
							stroke="currentColor"
							stroke-width={isActive ? '2.5' : '2'}
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polygon points="12 2 2 7 12 12 22 7 12 2" />
							<polyline points="2 17 12 22 22 17" />
							<polyline points="2 12 12 17 22 12" />
						</svg>
					{/if}
				</div>
				<span class="m3-label">{item.label === '/' ? 'home' : item.label}</span>
			</a>
		{/each}
	</div>
</nav>

<style>
	/* --- DESKTOP NAVIGATION --- */
	.desktop-only {
		display: flex;
	}

	.mobile-only {
		display: none;
	}

	.navbar-wrapper {
		position: fixed;
		top: 32px;
		left: 0;
		right: 0;
		justify-content: center;
		z-index: 100;
		pointer-events: none;
		padding: 0 16px;
		transition: top 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.navbar-wrapper.is-scrolled {
		top: 18px;
	}

	/* Initial Unscrolled State: Wide, relaxed, seamless with page */
	.md3e-nav-group {
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		gap: 28px;
		padding: 8px 28px;
		border-radius: var(--radius-md);
		background-color: transparent;
		border: 1px solid transparent;
		box-shadow: none;
		backdrop-filter: blur(0px);
		-webkit-backdrop-filter: blur(0px);
		transform: scale(1.04) translateZ(0);
		transition:
			gap 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			padding 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			-webkit-backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Magnetic Retraction / Inward Gathering Effect on Scroll */
	.md3e-nav-group.scrolled {
		gap: 6px;
		padding: 6px 14px;
		transform: scale(1) translateZ(0);
		background-color: color-mix(in srgb, var(--surface-container-low) 72%, transparent);
		border-color: var(--elevation-border);
		box-shadow: 0 10px 36px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(24px) saturate(180%);
		-webkit-backdrop-filter: blur(24px) saturate(180%);
	}

	/* Clean Containerless Navigation Links with responsive font-size & padding */
	.nav-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 8px 16px;
		background: transparent;
		border: none;
		outline: none;
		color: var(--text-secondary);
		font-family: var(--font-sans);
		font-size: 1.125rem;
		font-weight: 500;
		letter-spacing: -0.01em;
		text-decoration: none;
		user-select: none;
		box-shadow: none;
		transition:
			color 0.2s ease,
			transform 0.2s ease,
			padding 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			font-size 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			min-height 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.md3e-nav-group.scrolled .nav-btn {
		min-height: 38px;
		padding: 6px 14px;
		font-size: 1rem;
	}

	.nav-btn:hover {
		color: var(--text-primary);
		transform: translateY(-1px);
	}

	/* Active Tab Text Highlight */
	.nav-btn.is-active {
		color: var(--accent);
		font-weight: 700;
		transform: translateY(0);
	}

	/* Smooth Kinetic Accent Underline Indicator for standard tabs */
	.nav-btn:not(.is-slash-item)::after {
		content: '';
		position: absolute;
		bottom: 4px;
		left: 50%;
		width: 0;
		height: 3px;
		background-color: var(--accent);
		border-radius: 3px;
		transform: translateX(-50%);
		transition:
			width 0.25s var(--bezier-bounce),
			opacity 0.2s ease;
		opacity: 0;
	}

	.nav-btn:not(.is-slash-item).is-active::after {
		width: 22px;
		opacity: 1;
	}

	/* 100% Typographically Perfect Kinetic Slash Morph for '/' -> '//' */
	.slash-kinetic-group {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-size: 1.25rem;
		line-height: 1;
		letter-spacing: -0.02em;
		transition: font-size 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.md3e-nav-group.scrolled .slash-kinetic-group {
		font-size: 1.15rem;
	}

	.slash-char {
		display: inline-block;
		line-height: 1;
		transition:
			color 0.2s ease,
			transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* The companion font glyph starts at the bottom and smoothly docks right beside the main slash */
	.slash-char.companion {
		width: 0;
		max-width: 0;
		opacity: 0;
		overflow: hidden;
		transform: translate(-4px, 12px) rotate(60deg) scale(0.2);
		transform-origin: center bottom;
		pointer-events: none;
		transition:
			transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.22s ease,
			max-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
			width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* When active: perfectly parallel, aligned '//' with identical typography & height */
	.slash-char.companion.morph {
		width: auto;
		max-width: 1em;
		opacity: 1;
		transform: translate(0, 0) rotate(0deg) scale(1);
	}

	.btn-label {
		line-height: 1;
	}

	/* --- MOBILE STANDARD ANDROID MATERIAL 3 BOTTOM NAVIGATION BAR --- */
	@media (max-width: 768px) {
		.desktop-only {
			display: none !important;
		}

		.mobile-only {
			display: flex !important;
		}

		.mobile-m3-nav {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			z-index: 1000;
			background-color: var(--surface-container);
			border-top: 1px solid var(--elevation-border);
			padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 10px)) 16px;
			box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.16);
		}

		.m3-bar-inner {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			max-width: 520px;
			margin: 0 auto;
		}

		.m3-nav-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 6px;
			text-decoration: none;
			color: var(--text-secondary);
			flex: 1;
			min-height: 56px;
			padding: 4px 0;
			user-select: none;
			-webkit-tap-highlight-color: transparent;
			transition: color 0.2s ease;
		}

		.m3-nav-item:hover {
			color: var(--text-primary);
		}

		.m3-nav-item.is-active {
			color: var(--text-primary);
		}

		/* Material 3 Active Pill Indicator - Larger & easier to tap */
		.m3-icon-pill {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 72px;
			height: 38px;
			border-radius: 19px;
			background-color: transparent;
			color: inherit;
			transition:
				background-color 0.25s var(--bezier-bounce),
				color 0.2s ease,
				transform 0.2s var(--bezier-bounce);
		}

		.m3-icon-pill.active-pill {
			background-color: var(--accent-container);
			color: var(--on-accent-container);
			transform: scale(1.04);
		}

		.m3-icon-pill svg {
			width: 25px;
			height: 25px;
		}

		.m3-label {
			font-family: var(--font-sans);
			font-size: 0.8125rem;
			font-weight: 600;
			letter-spacing: 0.02em;
			line-height: 1;
			transition:
				color 0.2s ease,
				font-weight 0.2s ease;
		}

		.m3-nav-item.is-active .m3-label {
			color: var(--accent);
			font-weight: 700;
		}
	}
</style>

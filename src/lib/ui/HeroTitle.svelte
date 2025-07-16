<script>
	let username = "Smo//a L1st";
	let pronouns = "he/him";
	let greeting = "hey, i'm";
	let description = "Just a programmer.";
	let mounted = false;

	import { onMount } from "svelte";

	onMount(() => {
		mounted = true;
	});
</script>

<div class="hero-section" class:mounted>
	<!-- Desktop Title -->
	<div class="hero-title-desktop">
		<h1 class="title-text">
			<span class="greeting">{greeting}</span>
			<strong class="name">{username}</strong>
		</h1>
		<p class="pronouns">{pronouns}</p>
	</div>

	<!-- Mobile Title -->
	<div class="hero-title-mobile">
		<h1 class="mobile-title">
			<span class="greeting">{greeting}</span>
			<strong class="name">{username}</strong>
		</h1>
		<p class="pronouns">{pronouns}</p>
	</div>

	<!-- Description -->
	<div class="description">
		<p class="introduction">{description}</p>
	</div>
</div>

<style>
	.hero-section {
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hero-section.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-title-desktop {
		display: block;
	}

	.hero-title-mobile {
		display: none;
	}

	.title-text,
	.mobile-title {
		font-family: var(--font-one, system-ui, sans-serif);
		font-weight: 400;
		color: rgb(var(--m3-scheme-primary));
		margin: 0;
		line-height: 1.2;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.title-text {
		font-size: clamp(2.5rem, 5vw, 4rem);
	}

	.mobile-title {
		font-size: clamp(1.5rem, 8vw, 3rem);
		text-align: center;
	}

	.pronouns {
		font-family: var(--font-one, system-ui, sans-serif);
		color: rgb(var(--m3-scheme-on-surface-variant));
		font-size: clamp(0.9rem, 2vw, 1.1rem);
		margin: 0;
		margin-top: 0.25rem;
		font-weight: 400;
		opacity: 0.8;
	}

	.greeting {
		font-weight: 300;
		opacity: 0.9;
		font-size: 0.8em;
		color: rgb(var(--m3-scheme-on-background));
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.name {
		font-weight: 700;
		background: linear-gradient(
			135deg,
			rgb(var(--m3-scheme-primary)),
			rgb(var(--m3-scheme-secondary))
		);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 200% 200%;
		animation: gradient-shift 4s ease-in-out infinite;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.description {
		opacity: 1;
		transform: translateY(0);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.introduction {
		color: rgb(var(--m3-scheme-on-background));
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		font-weight: 300;
		line-height: 1.6;
		margin: 0;
		font-family: var(--font-one, system-ui, sans-serif);
		transition: font-size 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	/* Phone styles */
	@media (max-width: 768px) {
		.hero-section {
			text-align: center;
			gap: 1.5rem;
		}

		.hero-title-desktop {
			display: none;
		}

		.hero-title-mobile {
			display: block;
		}

		.introduction {
			text-align: center;
			max-width: 90%;
			margin: 0 auto;
		}
	}

	/* Reduce motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		.hero-section {
			transition: opacity 0.1s ease;
		}

		.hero-section.mounted {
			transform: translateY(0);
		}

		.name {
			animation: none;
			background: rgb(var(--m3-scheme-primary));
			background-clip: unset;
			-webkit-background-clip: unset;
			-webkit-text-fill-color: unset;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.name {
			animation: none;
			background: rgb(var(--m3-scheme-primary));
			background-clip: unset;
			-webkit-background-clip: unset;
			-webkit-text-fill-color: unset;
		}

		.greeting {
			opacity: 1;
		}

		.introduction {
			font-weight: 400;
		}
	}

	/* Support for browsers that don't support background-clip */
	@supports not (background-clip: text) {
		.name {
			color: rgb(var(--m3-scheme-primary));
			background: none;
		}
	}
</style>

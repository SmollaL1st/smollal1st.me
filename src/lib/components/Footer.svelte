<script lang="ts">
	import { version } from '$app/env';
	import { PROFILE, SOCIAL_LINKS } from '#lib/data/profile.ts';
	import WavyDivider from '#lib/components/WavyDivider.svelte';
</script>

<footer class="footer-wrapper wrapper">
	<WavyDivider height={16} strokeWidth={1.5} margin="0 0 24px 0" />

	<div class="bottom-bar">
		<nav class="socials-mini" aria-label="Social links">
			{#each SOCIAL_LINKS as link}
				<a
					href={link.url}
					target="_blank"
					rel="external noopener noreferrer"
					class="m3-btn text mini-link"
				>
					{link.name}
				</a>
			{/each}
		</nav>

		<div class="version-wrapper">
			<span class="m3-chip version-chip">ver.{version}</span>
		</div>
		<span class="copyright">© 2019-{new Date().getFullYear()} {PROFILE.name}</span>
	</div>
</footer>

<style>
	.footer-wrapper {
		position: relative;
		padding-block: 24px 36px;
	}

	.bottom-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		text-align: center;
	}

	.socials-mini {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 4px;
	}

	.mini-link {
		--_fg: var(--md-sys-color-on-surface-variant);
		font-size: 0.9375rem;
	}

	.mini-link:hover {
		--_fg: var(--md-sys-color-primary);
	}

	.version-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.version-chip,

	.copyright {
		color: var(--md-sys-color-outline);
		font: var(--md-sys-typescale-body-medium);
	}

	@media (max-width: 768px) {
		.footer-wrapper {
			padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px));
		}
	}
</style>

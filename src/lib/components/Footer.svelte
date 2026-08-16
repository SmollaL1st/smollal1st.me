<script lang="ts">
	import { version } from '$app/environment';
	import { PROFILE, SOCIAL_LINKS } from '$lib/data/profile';
	import WavyDivider from '$lib/components/WavyDivider.svelte';
</script>

<footer class="footer-wrapper wrapper">
	<WavyDivider height={16} strokeWidth={1.5} margin="0 0 24px 0" />

	<div class="bottom-bar">
		<div class="socials-mini">
			{#each SOCIAL_LINKS as link}
				<a href={link.url} target="_blank" rel="external noopener noreferrer" class="mini-link">
					{link.name}
				</a>
			{/each}
		</div>

		<div class="version-wrapper">
			<span class="version-badge">ver.{version}</span>
			<a
				href="https://v4.sml1.me"
				target="_blank"
				rel="external noopener noreferrer"
				class="version-link"
				title="Visit smollal1st.me V4"
			>
				<span>v4</span>
				<span class="arrow" aria-hidden="true">↗</span>
			</a>
		</div>

		<div class="copyright-wrapper">
			<span class="copyright">© {new Date().getFullYear()} {PROFILE.name}</span>
		</div>
	</div>
</footer>

<style>
	.footer-wrapper {
		position: relative;
		padding: 24px 0 36px;
	}

	.bottom-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 16px;
		padding-top: 4px;
	}

	.socials-mini {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 22px;
	}

	.mini-link {
		color: var(--text-secondary);
		font-size: 0.9375rem;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.mini-link:hover {
		color: var(--accent);
	}

	.version-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}

	.version-badge {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		background-color: var(--surface-container);
		border: 1px solid var(--elevation-border);
		color: var(--text-tertiary);
		letter-spacing: 0.02em;
	}

	.version-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: var(--radius-pill);
		background-color: var(--surface-container);
		border: 1px solid var(--elevation-border);
		color: var(--text-secondary);
		text-decoration: none;
		letter-spacing: 0.02em;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease,
			transform 0.15s ease;
	}

	.version-link:hover {
		background-color: var(--accent-container);
		color: var(--on-accent-container);
		border-color: var(--accent);
		transform: translateY(-1px);
	}

	.version-link .arrow {
		font-size: 0.8125rem;
		line-height: 1;
		transition: transform 0.2s ease;
	}

	.version-link:hover .arrow {
		transform: translate(1px, -1px);
	}

	.copyright-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.copyright {
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	@media (max-width: 768px) {
		.footer-wrapper {
			padding: 20px 0 calc(110px + env(safe-area-inset-bottom, 16px));
		}

		.bottom-bar {
			gap: 14px;
		}

		.socials-mini {
			gap: 16px;
		}
	}
</style>

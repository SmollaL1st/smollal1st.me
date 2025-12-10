<script lang="ts">
	import { version } from '$app/environment';
	import { Button } from 'm3-svelte';
	import { Icon } from 'svelte-icons-pack';
	import { BsSteam, BsInstagram, BsGithub, BsMastodon, BsDiscord } from 'svelte-icons-pack/bs';
</script>

<div class="back-cover-content">
	<div class="header">
		<h2 class="title">About</h2>
		<div class="subtitle">Just a man</div>
	</div>

	<div class="social-links">
		<div class="link-item">
			<span class="chapter-icon">
				<Icon src={BsGithub} />
			</span>
			<Button
				variant="text"
				iconType="left"
				onclick={() => window.open('https://github.com/SmollaL1st', '_blank')}
			>
				GitHub
			</Button>
		</div>

		<div class="link-item">
			<span class="chapter-icon">
				<Icon src={BsInstagram} />
			</span>
			<Button
				variant="text"
				iconType="left"
				onclick={() => window.open('https://www.instagram.com/smolla_l1st/', '_blank')}
			>
				Instagram
			</Button>
		</div>

		<div class="link-item">
			<span class="chapter-icon">
				<Icon src={BsDiscord} />
			</span>
			<Button
				variant="text"
				iconType="left"
				onclick={() => window.open('https://discord.com/users/651391077269372938', '_blank')}
			>
				Discord
			</Button>
		</div>

		<div class="link-item">
			<span class="chapter-icon">
				<Icon src={BsSteam} />
			</span>
			<Button
				variant="text"
				iconType="left"
				onclick={() => window.open('https://steamcommunity.com/id/SmollaL1st/', '_blank')}
			>
				Steam
			</Button>
		</div>

		<div class="link-item">
			<span class="chapter-icon">
				<Icon src={BsMastodon} />
			</span>
			<Button
				variant="text"
				iconType="left"
				onclick={() => window.open('https://mastodon.social/@SmollaL1st', '_blank')}
			>
				Mastodon
			</Button>
		</div>
	</div>

	<div class="colophon">
		<div class="ornament-line"></div>
		<span class="version">Version {version}</span>
		<span class="year">© {new Date().getFullYear()}</span>
	</div>
</div>

<style>
	.back-cover-content {
		width: 100%;
		height: 100%;
		padding: 20px 30px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.header {
		text-align: center;
		margin: 20px 0 30px;
	}

	.title {
		font-size: 42px;
		font-weight: 600;
		color: var(--m3c-on-surface);
		margin: 0 0 8px 0;
		letter-spacing: 2px;
	}

	.subtitle {
		font-size: 14px;
		color: var(--m3c-on-surface-variant);
		font-style: italic;
		letter-spacing: 1px;
	}

	.social-links {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;
		justify-content: center;
	}

	.link-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 8px 0;
		border-bottom: 1px dotted var(--m3c-outline), 0.3;
		transition: all 0.3s ease;
	}

	.link-item:hover {
		padding-left: 8px;
		border-bottom-color: var(--m3c-primary);
	}

	.link-item:last-child {
		border-bottom: none;
	}

	.chapter-icon {
		min-width: 32px;
		display: flex;
		justify-content: center;
		color: var(--m3c-primary);
	}

	.link-item :global(button) {
		flex: 1;
		justify-content: flex-start;
		font-size: 18px;
		font-weight: 500;
		text-transform: none;
	}

	.colophon {
		text-align: center;
		padding-top: 20px;
		color: var(--m3c-on-surface-variant);
		font-size: 12px;
	}

	.ornament-line {
		width: 60px;
		height: 1px;
		background: var(--m3c-outline);
		margin: 0 auto 12px;
	}

	.version {
		display: block;
		margin-bottom: 4px;
		letter-spacing: 1px;
	}

	.year {
		font-style: italic;
		font-size: 11px;
	}

	@media (max-width: 480px) {
		.back-cover-content {
			padding: 30px 20px;
		}

		.title {
			font-size: 32px;
		}

		.subtitle {
			font-size: 12px;
		}

		.link-item :global(button) {
			font-size: 16px;
		}

		.chapter-icon {
			font-size: 14px;
			min-width: 28px;
		}

		.social-links {
			gap: 8px;
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { PROFILE } from '#lib/data/profile.ts';
	import { createLanyardStore } from '#lib/data/lanyard.svelte.ts';
	import MorphShape from '#lib/components/MorphShape.svelte';

	const lanyard = createLanyardStore(PROFILE.discordId);

	let currentTime = $state('');

	onMount(() => {
		const cleanupLanyard = lanyard.init();

		const updateClock = () => {
			const now = new Date();
			currentTime = now.toLocaleTimeString('en-US', {
				timeZone: PROFILE.timezone,
				hour: 'numeric',
				minute: '2-digit',
				second: '2-digit',
				hour12: true
			});
		};

		updateClock();
		const clockInterval = setInterval(updateClock, 1000);

		return () => {
			cleanupLanyard();
			clearInterval(clockInterval);
		};
	});

	const statusColors: Record<string, string> = {
		online: '#23a55a',
		idle: '#f0b232',
		dnd: '#f23f43',
		offline: '#80848e'
	};

	let status = $derived(lanyard.data?.discord_status ?? 'offline');
	let discordUser = $derived(lanyard.data?.discord_user);
	let customActivity = $derived(
		lanyard.data?.activities?.find((a) => a.type === 0 || a.type === 4)
	);

	let avatarSrc = $derived(
		discordUser?.id && discordUser?.avatar
			? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
			: PROFILE.avatarUrl
	);

	let displayName = $derived(
		discordUser?.display_name || discordUser?.global_name || PROFILE.displayName
	);

	let username = $derived(discordUser?.username || PROFILE.handle);
</script>

<div class="activity-card">
	<div class="header-row">
		<div class="avatar-status-wrapper">
			<MorphShape shape="cookie9" image={avatarSrc} alt={displayName} class="discord-avatar" />
			<span
				class="status-indicator"
				style="background-color: {statusColors[status] || statusColors.offline};"
				title="Status: {status}"
			></span>
		</div>

		<div class="user-meta">
			<div class="username-line">
				<h3 class="display-name">@{username}</h3>
				<span class="status-badge" class:is-online={status !== 'offline'}>{status}</span>
			</div>
			<div class="clock-line">
				<span class="m3-icon" aria-hidden="true">schedule</span>
				<span>{currentTime || 'Local Time'} (GMT+2)</span>
			</div>
		</div>
	</div>

	<div class="activity-box">
		<span class="activity-icon" aria-hidden="true">
			<MorphShape shape="cookie6" />
			<span class="m3-icon">sports_esports</span>
		</span>
		{#if customActivity}
			<div class="activity-text">
				<span class="activity-type">Activity</span>
				<p class="activity-details">
					{customActivity.details || customActivity.state || customActivity.name}
				</p>
			</div>
		{:else}
			<div class="activity-text">
				<span class="activity-type">Status</span>
				<p class="activity-details">Available in Steam</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.activity-card {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 24px;
		border-radius: var(--md-sys-shape-corner-extra-large-increased);
		background-color: var(--md-sys-color-surface-container);
		transition: border-radius var(--m3-default-spatial);
	}

	.activity-card:hover {
		border-radius: var(--md-sys-shape-corner-extra-extra-large);
	}

	.header-row {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.avatar-status-wrapper {
		position: relative;
		flex-shrink: 0;
		width: 64px;
		height: 64px;
	}

	.avatar-status-wrapper :global(.discord-avatar) {
		width: 100%;
		height: 100%;
	}

	.status-indicator {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 3px solid var(--md-sys-color-surface-container);
	}

	.user-meta {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	.username-line {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
	}

	.display-name {
		font: var(--md-sys-typescale-emphasized-title-large);
		letter-spacing: -0.01em;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		height: 24px;
		padding-inline: 10px;
		border-radius: var(--md-sys-shape-corner-small);
		background-color: var(--md-sys-color-surface-container-highest);
		color: var(--md-sys-color-on-surface-variant);
		font: var(--md-sys-typescale-label-medium);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.status-badge.is-online {
		background-color: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		font-weight: 700;
	}

	.clock-line {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--md-ref-typeface-code);
		font-size: 0.8125rem;
	}

	.clock-line .m3-icon {
		--icon-size: 18px;
	}

	.activity-box {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px 16px 12px 12px;
		border-radius: var(--md-sys-shape-corner-large-increased);
		background-color: var(--md-sys-color-surface-container-high);
	}

	.activity-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		color: var(--md-sys-color-tertiary-container);
		transition: transform var(--m3-default-spatial);
	}

	.activity-box:hover .activity-icon {
		transform: rotate(60deg);
	}

	.activity-icon > :global(*) {
		grid-area: 1 / 1;
		width: 100%;
		height: 100%;
	}

	.activity-icon .m3-icon {
		--icon-fill: 1;
		--icon-size: 22px;
		width: 22px;
		height: 22px;
		color: var(--md-sys-color-on-tertiary-container);
		transition: transform var(--m3-default-spatial);
	}

	.activity-box:hover .activity-icon .m3-icon {
		transform: rotate(-60deg);
	}

	.activity-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.activity-type {
		color: var(--md-sys-color-tertiary);
		font: var(--md-sys-typescale-label-medium);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.activity-details {
		overflow: hidden;
		color: var(--md-sys-color-on-surface);
		font: var(--md-sys-typescale-body-medium);
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>

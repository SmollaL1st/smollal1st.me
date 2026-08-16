<script lang="ts">
	import { onMount } from 'svelte';
	import { PROFILE } from '$lib/data/profile';
	import { createLanyardStore } from '$lib/data/lanyard.svelte';

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

<div class="activity-card interactive-card">
	<div class="header-row">
		<div class="avatar-status-wrapper">
			<img src={avatarSrc} alt={displayName} class="discord-avatar" loading="lazy" />
			<div
				class="status-indicator"
				style="background-color: {statusColors[status] || statusColors.offline};"
				title="Status: {status}"
			></div>
		</div>

		<div class="user-meta">
			<div class="username-line">
				<h3 class="display-name">@{username}</h3>
				<span class="status-badge" class:is-online={status !== 'offline'}>
					{status}
				</span>
			</div>
			<div class="clock-line">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
				<span class="clock-text">{currentTime || 'Local Time'} (GMT+2)</span>
			</div>
		</div>
	</div>

	{#if customActivity}
		<!-- Custom Presence / Activity -->
		<div class="custom-activity-box">
			<span class="activity-type">Activity</span>
			<p class="activity-details">
				{customActivity.details || customActivity.state || customActivity.name}
			</p>
		</div>
	{:else}
		<!-- Fallback Activity Status -->
		<div class="default-status-box">
			<span class="pulse-dot"></span>
			<p class="default-status-text">Available in Steam</p>
		</div>
	{/if}
</div>

<style>
	.activity-card {
		background-color: var(--surface-container);
		border-radius: var(--radius-lg);
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		box-shadow: none;
		transition:
			transform 0.25s var(--bezier-bounce),
			background-color 0.3s ease,
			border-color 0.25s ease;
	}

	.header-row {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.avatar-status-wrapper {
		position: relative;
		flex-shrink: 0;
	}

	.discord-avatar {
		width: 58px;
		height: 58px;
		border-radius: var(--radius-md);
		object-fit: cover;
		background-color: var(--surface-container-highest);
	}

	.status-indicator {
		position: absolute;
		bottom: -2px;
		right: -2px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 3px solid var(--surface-container);
	}

	.user-meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.username-line {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.display-name {
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text-primary);
		letter-spacing: -0.02em;
	}

	.status-badge {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 8px;
		border-radius: var(--radius-pill);
		background-color: var(--surface-container-highest);
		color: var(--text-tertiary);
	}

	.status-badge.is-online {
		background-color: var(--accent-container);
		color: var(--on-accent-container);
		font-weight: 600;
	}

	.clock-line {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
	}

	/* Custom Activity & Fallback */
	.custom-activity-box,
	.default-status-box {
		padding: 12px 14px;
		border-radius: var(--radius-md);
		background-color: var(--surface-container-low);
		border: 1px solid var(--elevation-border);
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.activity-type {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 6px;
		background: var(--accent-container);
		color: var(--on-accent-container);
	}

	.activity-details {
		font-size: 0.875rem;
		color: var(--text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.pulse-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--accent);
		flex-shrink: 0;
	}

	.default-status-text {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}
</style>

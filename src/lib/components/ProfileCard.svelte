<script lang="ts">
	import Verified from '$lib/assets/Verified.svelte';

	interface Props {
		username: string;
		avatarUrl: string;
		isVerified?: boolean;
		isHovered?: boolean;
	}

	let { username, avatarUrl, isVerified = false, isHovered = false }: Props = $props();
</script>

<div class="profile-card" class:hovered={isHovered}>
	<!-- Avatar -->
	<div class="avatar-container">
		<img src={avatarUrl} alt={username} class="avatar" />
	</div>

	<!-- Username - appears on hover (desktop) or always visible (mobile) -->
	<div class="username-row" class:visible={isHovered}>
		<span class="username">@{username}</span>
		{#if isVerified}
			<Verified size={15} />
		{/if}
	</div>
</div>

<style>
	.profile-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		z-index: 10;
	}

	.avatar-container {
		position: relative;
		transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.profile-card.hovered .avatar-container {
		transform: scale(1.05);
	}

	.avatar {
		width: 150px;
		height: 150px;
		border-radius: 32px;
		object-fit: cover;
		display: block;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
	}

	.username-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		opacity: 0;
		transform: translateY(-10px);
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		pointer-events: none;
	}

	.username-row.visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.username {
		font-size: 18px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.95);
		letter-spacing: 0.01em;
	}

	/* Mobile styles */
	@media (max-width: 768px) {
		.avatar {
			width: 280px;
			height: 280px;
			border-radius: 48px;
		}

		.username-row {
			opacity: 1;
			transform: translateY(0);
			pointer-events: auto;
			margin-top: 8px;
		}

		.username {
			font-size: 20px;
		}
	}
</style>

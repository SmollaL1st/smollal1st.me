<script lang="ts">
	import Logo from '$lib/assets/Logo.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Verified from '$lib/assets/Verified.svelte';
	import BackCover from './BackCover.svelte';
	export let name: string;
	export let username: string;
	export let avatar_url: string;
	export let is_verified: boolean;
</script>

<main class="container">
	<div class="book">
		<div class="back-cover">
			<BackCover />
		</div>

		<div class="cover">
			<div class="bindingCrease"></div>
			<Logo size={45} />
			<div class="content">
				<h1 class="truncate name-container">
					{name || username}
				</h1>
				<Avatar url={avatar_url} {username} size={150} />
				<h2 class="username-verified-container">
					<span class="username">@{username}</span>
					{#if is_verified}
						<Verified />
					{/if}
				</h2>
			</div>
		</div>
	</div>
</main>

<style>
	.container {
		perspective: 2500px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.book {
		position: relative;
		width: 420px;
		height: 560px;
		margin: 20px;
		transform-style: preserve-3d;
		transition:
			transform 0.9s cubic-bezier(0.23, 1, 0.32, 1),
			filter 0.6s ease;
		filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3));
	}

	.back-cover {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgb(var(--m3-scheme-primary-container));
		border-radius: 0 20px 20px 0;
		box-shadow: -5px 8px 20px rgba(0, 0, 0, 0.3);
		transition: box-shadow 0.6s ease;
	}

	.cover {
		background: rgb(var(--m3-scheme-primary-container));
		width: 100%;
		height: 100%;
		position: absolute;
		text-align: center;
		border-radius: 20px;
		z-index: 1;
		padding: 30px;
		box-sizing: border-box;
		box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
		transform-origin: left center;
		transform-style: preserve-3d;
		transition:
			transform 1.2s cubic-bezier(0.23, 1, 0.32, 1),
			box-shadow 0.8s ease;
		backface-visibility: hidden;
		will-change: transform;
	}

	.book:hover .cover {
		transform: rotateY(-165deg) translateZ(10px);
		box-shadow:
			-15px 12px 40px rgba(0, 0, 0, 0.35),
			-25px 20px 60px rgba(0, 0, 0, 0.2);
	}

	.book:hover {
		transform: translateX(50px) translateY(-8px) rotateY(5deg);
		filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
	}

	.book:hover .back-cover {
		box-shadow:
			-8px 12px 30px rgba(0, 0, 0, 0.4),
			-15px 20px 50px rgba(0, 0, 0, 0.2);
	}

	.bindingCrease {
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 16px;
		background: linear-gradient(
			to right,
			rgba(var(--m3-scheme-on-primary-fixed-variant)),
			rgba(var(--m3-scheme-on-primary-fixed-variant))
		);
		border-radius: 3px 0 0 3px;
		border-right: solid rgb(var(--m3-scheme-on-primary-fixed-variant)) 1px;
		box-shadow:
			inset -3px 0 10px rgba(0, 0, 0, 0.2),
			inset 0 0 15px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.8s ease;
	}

	.book:hover .bindingCrease {
		box-shadow:
			inset -5px 0 15px rgba(0, 0, 0, 0.3),
			inset 0 0 20px rgba(0, 0, 0, 0.15);
	}

	.content {
		backface-visibility: hidden;
	}

	.username {
		color: rgb(var(--m3-scheme-on-primary-container));
	}

	.name-container {
		font-size: 50px;
		color: rgb(var(--m3-scheme-on-primary-container));
	}

	.name-container,
	.username-verified-container {
		margin: 40px 0;
		color: rgb(var(--m3-scheme-on-primary-container));
	}

	.username-verified-container {
		font-size: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.truncate {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 90vw;
	}

	@media (max-width: 768px) {
		.book:hover .cover {
			transform: rotateY(-145deg) translateZ(8px);
		}

		.book:hover {
			transform: translateX(30px) translateY(-6px) rotateY(3deg);
		}
	}

	@media (max-width: 480px) {
		.container {
			perspective: 2000px;
		}

		.truncate {
			max-width: 80vw;
		}

		.book {
			width: 90vw;
			max-width: 420px;
		}

		.name-container {
			font-size: 36px;
		}

		.username-verified-container {
			font-size: 20px;
		}

		.book:active .cover {
			transform: rotateY(-165deg) translateZ(10px);
			box-shadow:
				-15px 12px 40px rgba(0, 0, 0, 0.35),
				-25px 20px 60px rgba(0, 0, 0, 0.2);
		}

		.book:active {
			transform: translateX(25px) translateY(-5px) rotateY(3deg);
			filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4));
		}

		.book:active .back-cover {
			box-shadow:
				-8px 12px 30px rgba(0, 0, 0, 0.4),
				-15px 20px 50px rgba(0, 0, 0, 0.2);
		}
	}
</style>

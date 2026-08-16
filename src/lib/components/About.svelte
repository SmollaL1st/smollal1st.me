<script lang="ts">
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import Logo from '$lib/components/Logo.svelte';
</script>

<section id="about" class="about-section wrapper">
	<!-- Left: Live Activity Widget -->
	<div class="activity-col">
		<h2 class="section-title">activity</h2>
		<ActivityCard />
	</div>

	<!-- Right: Bio and Background -->
	<div class="bio-col">
		<h2 class="section-title">bio</h2>

		<!-- Outline Watermark (affa.nz style: attached to bio, overflowing horizontally to the right) -->
		<div class="bio-watermark" aria-hidden="true">
			<Logo variant="stroke" strokeWidth={2.5} class="bio-watermark-svg" />
		</div>

		<div class="bio-text-card">
			<p>
				My name is <b>Stanislav</b>. I'm <b>21</b> years old, originally from <b>Ukraine</b>, and a
				self-taught programmer who started programming in <b>2021</b>. I'm a big fan of Kotlin and
				everything related to Material 3 and Android development. I also did some development in
				Flutter/Dart, but I've since abandoned projects in that language. Currently, due to my work,
				I don't have time to actively develop my own projects. These are mostly closed projects, but
				I might make them public in the future. I also love heraldry and history; you can see my
				projects below. That's all for now.
			</p>
		</div>
	</div>
</section>

<style>
	.about-section {
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 40px;
		align-items: start;
		padding: 80px 0 60px;
		position: relative;
		z-index: 2;
	}

	.section-title {
		margin-bottom: 20px;
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 600;
		letter-spacing: -0.05em;
		color: var(--text-primary);
	}

	.bio-col {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	/* Outline Watermark (affa.nz style: attached to bio, overflowing horizontally) */
	.bio-watermark {
		position: absolute;
		right: 0;
		top: 52%;
		width: clamp(260px, 32vw, 420px);
		height: auto;
		transform: translate(65%, -10%) rotate(-6deg);
		pointer-events: none;
		user-select: none;
		z-index: 0;
		color: var(--text-primary);
		opacity: 0.22;
		transition:
			opacity 0.3s ease,
			color 0.3s ease;
	}

	:global(.bio-watermark-svg) {
		width: 100%;
		height: auto;
		display: block;
	}

	.bio-text-card {
		display: flex;
		flex-direction: column;
		gap: 18px;
		background-color: var(--surface-container);
		border-radius: var(--radius-lg);
		padding: 28px;
		box-shadow: none;
		position: relative;
		z-index: 2;
	}

	@media (max-width: 868px) {
		.about-section {
			grid-template-columns: 1fr;
			gap: 36px;
			padding: 40px 0 30px;
		}

		.bio-watermark {
			display: none;
		}
	}
</style>

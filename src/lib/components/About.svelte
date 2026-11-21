<script lang="ts">
	import ActivityCard from '#lib/components/ActivityCard.svelte';
	import Logo from '#lib/components/Logo.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
</script>

<section id="about" class="about-section wrapper">
	<!-- Left: live activity widget -->
	<div class="activity-col">
		<SectionHeader title="activity" shape="cookie6" tone="tertiary" />
		<ActivityCard />
	</div>

	<!-- Right: bio -->
	<div class="bio-col">
		<SectionHeader title="bio" shape="clover4" rotation={45} tone="primary" />

		<!-- Outline watermark, overflowing to the right -->
		<div class="bio-watermark" aria-hidden="true">
			<Logo variant="stroke" strokeWidth={2.5} class="bio-watermark-svg" />
		</div>

		<div class="bio-card">
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
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		align-items: start;
		gap: 40px;
		padding-block: 80px 56px;
	}

	.bio-col {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.bio-watermark {
		position: absolute;
		top: 52%;
		right: 0;
		z-index: 0;
		width: clamp(260px, 32vw, 420px);
		color: var(--md-sys-color-outline-variant);
		opacity: 0.55;
		transform: translate(65%, -10%) rotate(-6deg);
		pointer-events: none;
		transition: color var(--m3-slow-effects);
	}

	:global(.bio-watermark-svg) {
		display: block;
		width: 100%;
		height: auto;
	}

	.bio-card {
		position: relative;
		z-index: 2;
		padding: 32px;
		border-radius: var(--md-sys-shape-corner-extra-large-increased);
		background-color: var(--md-sys-color-surface-container);
		transition: border-radius var(--m3-default-spatial);
	}

	.bio-card:hover {
		border-radius: var(--md-sys-shape-corner-extra-extra-large);
	}

	.bio-card b {
		color: var(--md-sys-color-primary);
		font-weight: 650;
	}

	@media (max-width: 868px) {
		.about-section {
			grid-template-columns: 1fr;
			gap: 36px;
			padding-block: 40px 24px;
		}

		.bio-card {
			padding: 24px;
		}

		.bio-watermark {
			display: none;
		}
	}
</style>

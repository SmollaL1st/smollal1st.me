<script lang="ts">
	import Head from '#lib/components/Head.svelte';
	import Splash from '#lib/components/Splash.svelte';
	import Navbar from '#lib/components/Navbar.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import About from '#lib/components/About.svelte';
	import Projects from '#lib/components/Projects.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let showSplash = $state(true);
	let revealed = $state(false);
</script>

<Head />

{#if showSplash}
	<Splash onReveal={() => (revealed = true)} onComplete={() => (showSplash = false)} />
{/if}

<div class="site-container">
	<Navbar />

	<main id="main-content">
		<Hero {revealed} />
		<About />
		<Projects />
	</main>

	<Footer />
</div>

<style>
	.site-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}

	#main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 2;
	}
</style>

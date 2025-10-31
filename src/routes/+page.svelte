<script lang="ts">
	import Book from '$lib/components/Book.svelte';
	import Head from '$lib/components/Head.svelte';

	const username = 'SmollaL1st';
	const name = 'Smo//a L1st';
	const avatar_url = '../avatar/a_me.jpg';

	function generatePattern(): string {
		return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="rgba(0,0,0,0.0)"/>
        
        <text x="25%" y="25%" font-size="45" font-family="Arial" fill="rgba(255,255,255,0.1)"
            text-anchor="middle" dominant-baseline="middle" transform="rotate(45 25 25)">
            S
        </text>
        
        <text x="75%" y="75%" font-size="45" font-family="Arial" fill="rgba(255,255,255,0.1)"
            text-anchor="middle" dominant-baseline="middle" transform="rotate(45 75 75)">
            L
        </text>
    </svg>`)}`;
	}

	$: patternURL = generatePattern();
</script>

<Head />

<div class="layout" style="--pattern-url: url({patternURL})">
	<main class="container">
		<Book {name} {username} {avatar_url} is_verified={true} />
	</main>
</div>

<style>
	:global(:root) {
		--pattern-url: url('');
		margin: 0;
		font-family: 'Roboto', sans-serif;
		background-color: rgb(var(--m3-scheme-background));
		color: rgb(var(--m3-scheme-on-background));
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.layout {
		display: flex;
		flex-direction: column;
		min-height: calc(99vh);
		background-image: var(--pattern-url);
		background-size: 120px 120px;
		background-repeat: repeat;
	}

	.container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}
</style>

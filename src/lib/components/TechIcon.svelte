<script lang="ts">
	import {
		siKotlin,
		siKtor,
		siTauri,
		siSvelte,
		siTypescript,
		siAndroid,
		siFlutter,
		siDart,
		siMaterialdesign,
		siCloudflare,
		siVite,
		siDiscord,
		siGithub,
		siSteam,
		siInstagram,
		siMastodon,
		siPostgresql
	} from 'simple-icons';

	interface Props {
		name: string;
		size?: number;
		class?: string;
	}

	let { name, size = 14, class: className = '' }: Props = $props();

	// Official Simple Icons registry with pixel-perfect vector curves
	const ICONS_DICTIONARY: Record<string, { path: string }> = {
		kotlin: siKotlin,
		ktor: siKtor,
		tauri: siTauri,
		android: siAndroid,
		material3: siMaterialdesign,
		materialdesign: siMaterialdesign,
		m3: siMaterialdesign,
		flutter: siFlutter,
		dart: siDart,
		svelte: siSvelte,
		sveltekit: siSvelte,
		svelte5: siSvelte,
		typescript: siTypescript,
		ts: siTypescript,
		vite: siVite,
		cloudflare: siCloudflare,
		cloudflareworkers: siCloudflare,
		discord: siDiscord,
		github: siGithub,
		steam: siSteam,
		instagram: siInstagram,
		mastodon: siMastodon,
		postgresql: siPostgresql
	};

	function resolveTech(techName: string) {
		const key = techName.toLowerCase().replace(/[\s\._\-]/g, '');
		if (ICONS_DICTIONARY[key]) {
			return { kind: 'simple', path: ICONS_DICTIONARY[key].path };
		}
		for (const [k, icon] of Object.entries(ICONS_DICTIONARY)) {
			if (key.includes(k)) {
				return { kind: 'simple', path: icon.path };
			}
		}
		if (
			key.includes('physics') ||
			key.includes('spring') ||
			key.includes('animation') ||
			key.includes('motion')
		) {
			return { kind: 'motion' };
		}
		return { kind: 'code' };
	}

	const techInfo = $derived(resolveTech(name));
</script>

<span class="tech-icon-wrapper {className}" style="--icon-size: {size}px;" aria-hidden="true">
	{#if techInfo.kind === 'simple' && techInfo.path}
		<!-- Official Simple Icon 24x24 Vector Path -->
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
			<path d={techInfo.path} />
		</svg>
	{:else if techInfo.kind === 'motion'}
		<!-- Fluid Spring Motion Icon -->
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M2 12h2a4 4 0 0 1 4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 1 4-4h2" />
			<path d="M6 8a4 4 0 0 1 4-4 4 4 0 0 1 4 4" />
		</svg>
	{:else}
		<!-- Clean Semantic Code Icon -->
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	{/if}
</span>

<style>
	.tech-icon-wrapper {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--icon-size, 14px);
		height: var(--icon-size, 14px);
		flex-shrink: 0;
	}

	.tech-icon-wrapper svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>

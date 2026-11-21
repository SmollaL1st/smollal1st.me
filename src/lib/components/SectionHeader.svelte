<script lang="ts">
	import type { ShapeName } from '#lib/utils/shapes.ts';
	import MorphShape from '#lib/components/MorphShape.svelte';

	interface Props {
		title: string;
		shape?: ShapeName;
		/** Resting rotation of the glyph, in degrees. */
		rotation?: number;
		tone?: 'primary' | 'secondary' | 'tertiary';
	}

	let { title, shape = 'cookie4', rotation = 0, tone = 'primary' }: Props = $props();
</script>

<h2 class="section-header tone-{tone}">
	<span class="section-glyph">
		<MorphShape {shape} {rotation} />
	</span>
	<span>{title}</span>
</h2>

<style>
	.section-header {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 24px;
		font-family: var(--md-ref-typeface-brand);
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-variation-settings:
			'wght' 650,
			'ROND' 40,
			'opsz' 72;
		line-height: 1.1;
		letter-spacing: -0.03em;
		color: var(--md-sys-color-on-surface);
	}

	.section-glyph {
		width: 0.72em;
		height: 0.72em;
		flex-shrink: 0;
		color: var(--glyph);
		transition: transform var(--m3-default-spatial);
	}

	.section-header:hover .section-glyph {
		transform: rotate(90deg) scale(1.12);
	}

	.tone-primary {
		--glyph: var(--md-sys-color-primary);
	}

	.tone-secondary {
		--glyph: var(--md-sys-color-secondary);
	}

	.tone-tertiary {
		--glyph: var(--md-sys-color-tertiary);
	}
</style>

<script lang="ts">
	import { PROJECTS } from '#lib/data/profile.ts';
	import type { ProjectBadge, BadgeVariant } from '#lib/types.ts';
	import TechIcon from '#lib/components/TechIcon.svelte';
	import WavyDivider from '#lib/components/WavyDivider.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';

	const KNOWN_BADGE_VARIANTS: Record<string, BadgeVariant> = {
		'in development': 'wip',
		wip: 'wip',
		closed: 'closed',
		close: 'closed',
		private: 'closed',
		abandoned: 'abandoned',
		archived: 'abandoned',
		'open source': 'opensource'
	};

	// Material Symbols per badge variant ('wip' uses an animated dot instead)
	const BADGE_ICONS: Record<BadgeVariant, string | null> = {
		wip: null,
		closed: 'lock',
		abandoned: 'inventory_2',
		opensource: 'public',
		default: 'auto_awesome'
	};

	function resolveBadge(badge?: ProjectBadge): { label: string; variant: BadgeVariant } | null {
		if (!badge) return null;
		const label = typeof badge === 'object' ? badge.label : badge;
		const explicit = typeof badge === 'object' ? badge.variant : undefined;
		return {
			label,
			variant: explicit ?? KNOWN_BADGE_VARIANTS[label.toLowerCase()] ?? 'default'
		};
	}
</script>

<section id="projects" class="projects-section wrapper">
	<SectionHeader title="projects" shape="sunny" tone="secondary" />

	<div class="projects-grid">
		{#each PROJECTS as project, i (project.title + '_' + i)}
			{@const badge = resolveBadge(project.badge)}
			<article class="project-card">
				<div class="card-header">
					<h3 class="project-title">{project.title}</h3>
					{#if badge}
						<span class="project-badge badge-{badge.variant}">
							{#if badge.variant === 'wip'}
								<span class="pulse-dot" aria-hidden="true"></span>
							{:else}
								<span class="m3-icon" aria-hidden="true">{BADGE_ICONS[badge.variant]}</span>
							{/if}
							<span>{badge.label}</span>
						</span>
					{/if}
				</div>

				<p class="project-desc">{project.description}</p>

				<ul class="tags-row" aria-label="Technologies">
					{#each project.tags as tag}
						<li class="m3-chip tag-chip">
							{#if project.showIcons !== false}
								<TechIcon name={tag} size={16} class="tag-icon" />
							{/if}
							<span>{tag}</span>
						</li>
					{/each}
				</ul>

				{#if project.links}
					<WavyDivider height={12} strokeWidth={1.5} margin="auto 0 16px 0" />
					<div class="links-row">
						{#if project.links.demo}
							<a
								href={project.links.demo}
								target="_blank"
								rel="external noopener noreferrer"
								class="m3-btn filled action-link"
							>
								<span class="m3-icon" aria-hidden="true">open_in_new</span>
								<span>Live</span>
							</a>
						{/if}
						{#if project.links.github}
							<a
								href={project.links.github}
								target="_blank"
								rel="external noopener noreferrer"
								class="m3-btn tonal action-link"
							>
								<span class="m3-icon" aria-hidden="true">code</span>
								<span>Source</span>
							</a>
						{/if}
						{#if project.links.external}
							<a
								href={project.links.external}
								target="_blank"
								rel="external noopener noreferrer"
								class="m3-btn outlined action-link"
							>
								<span class="m3-icon" aria-hidden="true">arrow_outward</span>
								<span>Visit</span>
							</a>
						{/if}
					</div>
				{/if}
			</article>
		{/each}
	</div>
</section>

<style>
	.projects-section {
		position: relative;
		z-index: 2;
		padding-block: 56px 80px;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
		gap: 16px;
	}

	/* ---------- Card ---------- */

	.project-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 24px;
		border-radius: var(--md-sys-shape-corner-extra-large);
		background-color: var(--md-sys-color-surface-container);
		transition:
			border-radius var(--m3-default-spatial),
			background-color var(--m3-default-effects),
			transform var(--m3-fast-spatial);
	}

	.project-card:hover {
		border-radius: var(--md-sys-shape-corner-extra-large-increased);
		background-color: var(--md-sys-color-surface-container-high);
		transform: translateY(-4px);
	}

	/* Progressive enhancement: cards spring into view while scrolling */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.project-card {
				animation: card-in linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 70%;
			}
		}
	}

	@keyframes card-in {
		from {
			opacity: 0;
			translate: 0 40px;
			scale: 0.94;
		}
	}

	.card-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin-bottom: 12px;
	}

	.project-title {
		font: var(--md-sys-typescale-emphasized-title-large);
		font-size: 1.375rem;
		font-variation-settings: 'ROND' 30;
		letter-spacing: -0.015em;
	}

	/* ---------- Badges ---------- */

	.project-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 26px;
		padding-inline: 8px 10px;
		border-radius: var(--md-sys-shape-corner-small);
		font: var(--md-sys-typescale-label-medium);
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.project-badge .m3-icon {
		--icon-size: 16px;
		--icon-fill: 1;
	}

	.badge-wip {
		background-color: var(--md-sys-color-tertiary-container);
		color: var(--md-sys-color-on-tertiary-container);
	}

	.badge-opensource {
		background-color: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
	}

	.badge-default {
		background-color: var(--md-sys-color-tertiary-container);
		color: var(--md-sys-color-on-tertiary-container);
	}

	.badge-closed {
		background-color: var(--md-sys-color-surface-container-highest);
		color: var(--md-sys-color-on-surface);
	}

	.badge-abandoned {
		box-shadow: inset 0 0 0 1px var(--md-sys-color-outline-variant);
		color: var(--md-sys-color-on-surface-variant);
	}

	.pulse-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: currentColor;
		animation: badge-pulse 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
	}

	@keyframes badge-pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.35;
			transform: scale(1.3);
		}
	}

	/* ---------- Body ---------- */

	.project-desc {
		flex: 1;
		margin-bottom: 18px;
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.tags-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 20px;
		list-style: none;
	}

	.tag-chip {
		height: 30px;
		padding-inline: 10px 12px;
		font-size: 0.8125rem;
	}

	.tag-chip:hover {
		background-color: var(--md-sys-color-surface-container-highest);
		color: var(--md-sys-color-on-surface);
		box-shadow: inset 0 0 0 1px transparent;
		border-radius: var(--md-sys-shape-corner-medium);
	}

	.tag-chip :global(.tag-icon) {
		color: var(--md-sys-color-primary);
	}

	.links-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
	}

	.action-link {
		padding-inline: 14px 18px;
	}

	/* Neutral tonal: reads better than secondary-container on the Expressive dark scheme */
	.action-link.tonal {
		--_bg: var(--md-sys-color-surface-container-highest);
		--_fg: var(--md-sys-color-primary);
	}

	.action-link:hover {
		border-radius: var(--_square);
	}

	.action-link:active {
		border-radius: var(--_pressed);
	}
</style>

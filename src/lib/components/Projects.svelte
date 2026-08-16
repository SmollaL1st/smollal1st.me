<script lang="ts">
	import { PROJECTS } from '$lib/data/profile';
	import type { ProjectBadge, BadgeVariant } from '$lib/types';
	import TechIcon from '$lib/components/TechIcon.svelte';
	import WavyDivider from '$lib/components/WavyDivider.svelte';

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

	function resolveBadge(
		badge?: ProjectBadge
	): { label: string; variantClass: string; variant: BadgeVariant } | null {
		if (!badge) return null;

		if (typeof badge === 'object') {
			const variant = badge.variant ?? KNOWN_BADGE_VARIANTS[badge.label.toLowerCase()] ?? 'default';
			return {
				label: badge.label,
				variantClass: `badge-${variant}`,
				variant
			};
		}

		const variant = KNOWN_BADGE_VARIANTS[badge.toLowerCase()] ?? 'default';
		return {
			label: badge,
			variantClass: `badge-${variant}`,
			variant
		};
	}
</script>

<section id="projects" class="projects-section wrapper">
	<div class="section-header">
		<h2 class="section-title">projects</h2>
	</div>

	<div class="projects-grid">
		{#each PROJECTS as project, i (project.title + '_' + i)}
			{@const badgeInfo = resolveBadge(project.badge)}
			<article class="project-card interactive-card">
				<!-- Card Header -->
				<div class="card-header">
					<div class="title-group">
						<h3 class="project-title">{project.title}</h3>
						{#if badgeInfo}
							<span class="project-badge {badgeInfo.variantClass}">
								{#if badgeInfo.variant === 'wip'}
									<span class="pulse-dot" aria-hidden="true"></span>
								{:else if badgeInfo.variant === 'closed'}
									<svg
										class="badge-icon"
										viewBox="0 0 24 24"
										width="11"
										height="11"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"
									>
										<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
										<path d="M7 11V7a5 5 0 0 1 10 0v4" />
									</svg>
								{:else if badgeInfo.variant === 'abandoned'}
									<svg
										class="badge-icon"
										viewBox="0 0 24 24"
										width="11"
										height="11"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"
									>
										<polyline points="21 8 21 21 3 21 3 8" />
										<rect x="1" y="3" width="22" height="5" />
										<line x1="10" y1="12" x2="14" y2="12" />
									</svg>
								{/if}
								<span>{badgeInfo.label}</span>
							</span>
						{/if}
					</div>
				</div>

				<!-- Description -->
				<p class="project-desc">{project.description}</p>

				<!-- Tag Chips with Icons -->
				<div class="tags-row">
					{#each project.tags as tag}
						<span class="tag-chip">
							{#if project.showIcons !== false}
								<TechIcon name={tag} size={13} class="tag-icon" />
							{/if}
							<span>{tag}</span>
						</span>
					{/each}
				</div>

				<!-- Action Links -->
				{#if project.links}
					<WavyDivider height={12} strokeWidth={1.5} margin="auto 0 12px 0" />
					<div class="links-row">
						{#if project.links.github}
							<a
								href={project.links.github}
								target="_blank"
								rel="external noopener noreferrer"
								class="action-link"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
									/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
								>
								<span>Source</span>
								<span class="arrow">↗</span>
							</a>
						{/if}
						{#if project.links.demo}
							<a
								href={project.links.demo}
								target="_blank"
								rel="external noopener noreferrer"
								class="action-link primary"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
										points="15 3 21 3 21 9"
									/><line x1="10" x2="21" y1="14" y2="3" /></svg
								>
								<span>Live</span>
								<span class="arrow">↗</span>
							</a>
						{/if}
						{#if project.links.external}
							<a
								href={project.links.external}
								target="_blank"
								rel="external noopener noreferrer"
								class="action-link"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
										points="15 3 21 3 21 9"
									/><line x1="10" x2="21" y1="14" y2="3" /></svg
								>
								<span>Visit</span>
								<span class="arrow">↗</span>
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
		padding: 60px 0 80px;
		position: relative;
		z-index: 2;
	}

	.section-header {
		margin-bottom: 32px;
	}

	.section-title {
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 600;
		letter-spacing: -0.05em;
		color: var(--text-primary);
		margin-bottom: 6px;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 24px;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		background-color: var(--surface-container);
		border-radius: var(--radius-lg);
		padding: 26px;
		box-shadow: none;
		position: relative;
		z-index: 2;
		transition:
			transform 0.25s var(--bezier-bounce),
			background-color 0.25s ease,
			border-color 0.25s ease;
	}

	.project-card:hover {
		transform: translateY(-4px);
		border-color: var(--accent);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
		margin-bottom: 12px;
	}

	.title-group {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
	}

	.project-title {
		font-size: 1.35rem;
		font-weight: 600;
		color: var(--text-primary);
		letter-spacing: -0.03em;
	}

	/* Badges */
	.project-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 3px 9px;
		border-radius: var(--radius-pill);
		font-weight: 700;
		line-height: 1.2;
		transition: all 0.2s ease;
	}

	.badge-icon {
		flex-shrink: 0;
	}

	/* In Development (WIP) */
	.project-badge.badge-wip {
		background-color: var(--accent-container);
		color: var(--on-accent-container);
		border: 1px solid var(--accent);
	}

	.pulse-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: var(--accent);
		display: inline-block;
		animation: badgePulse 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
	}

	@keyframes badgePulse {
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

	/* Closed / Private */
	.project-badge.badge-closed {
		background-color: var(--surface-container-highest);
		color: var(--text-primary);
		border: 1px solid var(--elevation-border);
	}

	/* Abandoned / Archived */
	.project-badge.badge-abandoned {
		background-color: var(--surface-container-low);
		color: var(--text-tertiary);
		border: 1px dashed var(--text-tertiary);
		opacity: 0.85;
	}

	/* Open Source / Default */
	.project-badge.badge-opensource,
	.project-badge.badge-default {
		background-color: var(--accent-container);
		color: var(--on-accent-container);
	}

	.project-desc {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin-bottom: 18px;
		flex: 1;
	}

	.tags-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 20px;
	}

	.tag-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		padding: 4px 10px;
		background-color: var(--surface-container-low);
		border: 1px solid var(--elevation-border);
		border-radius: var(--radius-pill);
		color: var(--text-secondary);
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.tag-chip:hover {
		border-color: var(--accent);
		color: var(--text-primary);
	}

	:global(.tag-icon) {
		color: var(--accent);
	}

	.links-row {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 0;
		padding-top: 0;
		border-top: none;
	}

	.action-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border-radius: var(--radius-pill);
		background-color: var(--surface-container-high);
		color: var(--text-primary);
		font-size: 0.875rem;
		font-weight: 500;
		box-shadow: none;
		transition:
			background-color 0.2s ease,
			transform 0.15s ease,
			color 0.2s ease;
	}

	.action-link:hover {
		background-color: var(--accent-container);
		color: var(--on-accent-container);
		transform: translateY(-2px);
	}

	.action-link.primary {
		background-color: var(--accent);
		color: #ffffff;
		border-color: var(--accent);
	}

	.action-link.primary:hover {
		background-color: var(--accent-hover);
	}

	.arrow {
		font-size: 0.9375rem;
		transition: transform 0.2s ease;
	}

	.action-link:hover .arrow {
		transform: translate(2px, -2px);
	}

	@media (max-width: 640px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

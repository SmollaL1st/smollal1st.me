<script lang="ts">
	import { version } from '$app/environment';

	interface SocialLink {
		name: string;
		url: string;
		icon: string;
		isInfo?: boolean;
	}

	interface Props {
		links?: SocialLink[];
		visible?: boolean;
		ver?: string;
	}

	let { links = [], visible = false, ver = version }: Props = $props();
	let hoveredInfo = $state(false);

	// Desktop: Calculate position for circular menu
	function getCircularPosition(index: number, total: number) {
		const angle = (index * (360 / total) - 90) * (Math.PI / 180);
		const radius = 170;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;
		return { x, y, angle: index * (360 / total) };
	}

	// Mobile: Helper to determine the shape class based on index
	function getShapeClass(index: number, total: number): string {
		if (total === 1) return 'shape-single';
		if (index === 0) return 'shape-top';
		if (index === total - 1) return 'shape-bottom';
		return 'shape-middle';
	}
</script>

<div class="circular-menu desktop-only" class:visible>
	{#each links as link, i}
		{@const pos = getCircularPosition(i, links.length)}
		{#if link.isInfo}
			<div
				class="social-btn circular info-btn"
				role="button"
				tabindex="0"
				style="
					--x: {pos.x}px; 
					--y: {pos.y}px; 
					--delay: {i * 0.05}s;
				"
				onmouseenter={() => (hoveredInfo = true)}
				onmouseleave={() => (hoveredInfo = false)}
			>
				{@html link.icon}
				{#if hoveredInfo}
					<div class="version-tooltip">ver.{ver}</div>
				{/if}
			</div>
		{:else}
			<a
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				class="social-btn circular"
				title={link.name}
				style="
					--x: {pos.x}px; 
					--y: {pos.y}px; 
					--delay: {i * 0.05}s;
				"
			>
				{@html link.icon}
			</a>
		{/if}
	{/each}
</div>

<div class="list-menu mobile-only">
	<div class="list-group">
		{#each links as link, i}
			{@const shapeClass = getShapeClass(i, links.length)}

			{#if link.isInfo}
				<div class="social-btn list-item {shapeClass}">
					<span class="link-name">ver.{ver}</span>
				</div>
			{:else}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="social-btn list-item {shapeClass}"
					style="--delay: {i * 0.05}s"
				>
					<span class="link-name">{link.name}</span>
				</a>
			{/if}
		{/each}
	</div>
</div>

<style>
	/* --- DESKTOP STYLES --- */
	.circular-menu {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0;
		height: 0;
		pointer-events: none;
		z-index: 5;
	}

	.circular-menu.visible {
		pointer-events: auto;
	}

	.social-btn.circular {
		position: absolute;
		width: 52px;
		height: 52px;
		background: rgba(35, 35, 35, 0.95);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
		transition-delay: var(--delay);
	}

	.circular-menu.visible .social-btn.circular {
		transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
		opacity: 1;
	}

	.social-btn.circular:hover {
		background: rgba(55, 55, 55, 0.95);
		transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.15) !important;
	}

	.social-btn.circular :global(svg) {
		width: 24px;
		height: 24px;
		fill: rgba(255, 255, 255, 0.85);
	}

	.info-btn { cursor: default; }
	.version-tooltip {
		position: absolute;
		top: 50%;
		right: calc(100% + 12px);
		transform: translateY(-50%);
		background: rgba(25, 25, 25, 0.95);
		padding: 8px 14px;
		border-radius: 10px;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.8);
		white-space: nowrap;
		animation: tooltipSlideLeft 0.2s ease;
	}

	@keyframes tooltipSlideLeft {
		from {
			opacity: 0;
			transform: translateY(-50%) translateX(10px);
		}
		to {
			opacity: 1;
			transform: translateY(-50%) translateX(0);
		}
	}


	/* --- MOBILE LIST STYLES --- */
	
	.list-menu {
		display: none;
		width: 100%;
		max-width: 500px;
		padding: 0 5px;
		z-index: 10;
	}

	.list-group {
		display: flex;
		flex-direction: column;
		gap: 3px; 
		width: 100%;
	}

	.social-btn.list-item {
		width: 100%;
		padding: 20px 28px; 
		
		background-color: #222222; 
		
		border: none;
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: background-color 0.2s ease;
		
		font-family: sans-serif;
		font-size: large;
	}

	.social-btn.list-item:hover {
		background-color: #2f2f2f;
	}

	.link-name {
		font-size: 22px;
		font-weight: 400;
		color: #E0E0E0;
		letter-spacing: 0.4px;
	}

	/* --- Shapes --- */
	
	.shape-single {
		border-radius: 20px;
	}
	
	.shape-top {
		border-radius: 20px 20px 5px 5px;
	}
	

	.shape-middle {
		border-radius: 4px;
	}
	
	.shape-bottom {
		border-radius: 4px 4px 20px 20px;
	}

	/* Responsive */
	.desktop-only { display: block; }
	.mobile-only { display: none; }

	@media (max-width: 768px) {
		.desktop-only { display: none; }
		.mobile-only { 
			display: flex; 
			justify-content: center;
		}
	}
</style>
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
		const radius = 230;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;
		return { x, y };
	}

	// Mobile: Helper to determine the shape class based on index
	function getShapeClass(index: number, total: number): string {
		if (total === 1) return 'shape-single';
		if (index === 0) return 'shape-top';
		if (index === total - 1) return 'shape-bottom';
		return 'shape-middle';
	}

	function getIconPath(icon: string): string {
		const pathMatch = icon.match(/d="([^"]+)"/);
		return pathMatch?.[1] ?? '';
	}

	// Physics: Magnetic hover effect
	function handleMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		
		const distanceX = e.clientX - centerX;
		const distanceY = e.clientY - centerY;
		
		target.style.setProperty('--mag-x', `${distanceX * 0.35}px`);
		target.style.setProperty('--mag-y', `${distanceY * 0.35}px`);
	}

	function handleMouseLeave(e: MouseEvent, isInfo: boolean = false) {
		const target = e.currentTarget as HTMLElement;
		target.style.setProperty('--mag-x', `0px`);
		target.style.setProperty('--mag-y', `0px`);
		if (isInfo) hoveredInfo = false;
	}
</script>

<div class="circular-menu desktop-only" class:visible>
	{#each links as link, i (link.name)}
		{@const pos = getCircularPosition(i, links.length)}
		{#if link.isInfo}
			<div
				class="social-btn circular info-btn"
				role="button"
				tabindex="0"
				style="
					--x: {pos.x}px; 
					--y: {pos.y}px; 
					--delay: {i * 0.06}s;
				"
				onmouseenter={() => (hoveredInfo = true)}
				onmousemove={handleMouseMove}
				onmouseleave={(e) => handleMouseLeave(e, true)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d={getIconPath(link.icon)} />
				</svg>
				{#if hoveredInfo}
					<div class="version-tooltip">ver.{ver}</div>
				{/if}
			</div>
		{:else}
			<a
				href={link.url}
				target="_blank"
				rel="external noopener noreferrer"
				class="social-btn circular"
				title={link.name}
				style="
					--x: {pos.x}px; 
					--y: {pos.y}px; 
					--delay: {i * 0.06}s;
				"
				onmousemove={handleMouseMove}
				onmouseleave={(e) => handleMouseLeave(e)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d={getIconPath(link.icon)} />
				</svg>
			</a>
		{/if}
	{/each}
</div>

<div class="list-menu mobile-only">
	<div class="list-group">
		{#each links as link, i (link.name)}
			{@const shapeClass = getShapeClass(i, links.length)}

			{#if link.isInfo}
				<div class="social-btn list-item {shapeClass}">
					<span class="link-name">ver.{ver}</span>
				</div>
			{:else}
				<a
					href={link.url}
					target="_blank"
					rel="external noopener noreferrer"
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
		--mag-x: 0px;
		--mag-y: 0px;
		position: absolute;
		width: 74px;
		height: 74px;
		background: rgba(35, 35, 35, 0.95);
		border-radius: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		/* Highly elastic cubic-bezier for a bouncy/plastic opening animation */
		transition:
			transform 0.9s cubic-bezier(0.34, 1.8, 0.64, 1),
			opacity 0.4s ease,
			background-color 0.3s ease;
		transition-delay: var(--delay), 0s, 0s;
	}

	.circular-menu.visible .social-btn.circular {
		transform: translate(
			calc(-50% + var(--x) + var(--mag-x)), 
			calc(-50% + var(--y) + var(--mag-y))
		) scale(1);
		opacity: 1;
		/* Add continuous floating effect to make it feel alive */
		animation: float 4s ease-in-out infinite;
		animation-delay: calc(var(--delay) * 4);
	}

	@keyframes float {
		0%, 100% { margin-top: 0px; }
		50% { margin-top: -8px; }
	}

	.social-btn.circular:hover {
		background: rgba(55, 55, 55, 0.95);
		transform: translate(
			calc(-50% + var(--x) + var(--mag-x)), 
			calc(-50% + var(--y) + var(--mag-y))
		) scale(1.15) !important;
		/* Snappy magnetic response on hover */
		transition:
			transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			background-color 0.3s ease;
		transition-delay: 0s;
	}

	.social-btn.circular svg {
		width: 40px;
		height: 40px;
		fill: rgba(255, 255, 255, 0.85);
	}

	.info-btn {
		cursor: default;
	}
	.version-tooltip {
		position: absolute;
		top: 50%;
		right: calc(100% + 12px);
		transform: translateY(-50%);
		background: rgba(25, 25, 25, 0.95);
		padding: 8px 14px;
		border-radius: 12px;
		font-size: 20px;
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
		color: #e0e0e0;
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
	.desktop-only {
		display: block;
	}
	.mobile-only {
		display: none;
	}

	@media (max-width: 768px) {
		.desktop-only {
			display: none;
		}
		.mobile-only {
			display: flex;
			justify-content: center;
		}
	}
</style>

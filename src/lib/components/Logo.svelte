<script lang="ts">
	import { LOGO_VIEWBOX, LOGO_PATHS } from '$lib/data/logo';

	interface Props {
		width?: number | string;
		height?: number | string;
		class?: string;
		variant?: 'fill' | 'stroke' | 'animated';
		strokeWidth?: number;
	}

	let {
		width = 295,
		height = 374,
		class: className = '',
		variant = 'fill',
		strokeWidth = 2.5
	}: Props = $props();
</script>

<svg
	viewBox={LOGO_VIEWBOX}
	width={typeof width === 'number' ? `${width}px` : width}
	height={typeof height === 'number' ? `${height}px` : height}
	fill={variant === 'stroke' || variant === 'animated' ? 'none' : 'currentColor'}
	xmlns="http://www.w3.org/2000/svg"
	class="logo-svg {className}"
	class:is-stroke={variant === 'stroke'}
	class:is-animated={variant === 'animated'}
>
	<path
		d={LOGO_PATHS.primary}
		pathLength={variant === 'animated' ? '100' : undefined}
		fill={variant === 'stroke' ? 'none' : 'currentColor'}
		stroke={variant === 'stroke' || variant === 'animated' ? 'currentColor' : undefined}
		stroke-width={variant === 'stroke' || variant === 'animated' ? strokeWidth : undefined}
		stroke-linejoin={variant === 'stroke' || variant === 'animated' ? 'round' : undefined}
	/>
	<path
		d={LOGO_PATHS.secondary}
		pathLength={variant === 'animated' ? '100' : undefined}
		fill={variant === 'stroke' ? 'none' : 'currentColor'}
		stroke={variant === 'stroke' || variant === 'animated' ? 'currentColor' : undefined}
		stroke-width={variant === 'stroke' || variant === 'animated' ? strokeWidth : undefined}
		stroke-linejoin={variant === 'stroke' || variant === 'animated' ? 'round' : undefined}
	/>
</svg>

<style>
	.logo-svg {
		display: block;
	}

	.logo-svg.is-animated path {
		fill: rgba(0, 0, 0, 0);
		stroke: var(--accent);
		stroke-width: 2.5;
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		animation:
			drawStroke 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards,
			fillLogo 0.4s ease 1.1s forwards;
	}

	@keyframes drawStroke {
		0% {
			stroke-dashoffset: 100;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fillLogo {
		0% {
			fill: rgba(0, 0, 0, 0);
			stroke-width: 2.5;
		}
		100% {
			fill: var(--accent);
			stroke-width: 0;
		}
	}
</style>

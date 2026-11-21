<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { radiiFor, lerpRadii, radiiToPath, Spring, type ShapeName } from '#lib/utils/shapes.ts';

	interface Props {
		/** Target shape — changing it springs the outline into the new shape. */
		shape: ShapeName;
		/** Rotation in degrees, spring-animated. */
		rotation?: number;
		/** Continuous rotation in degrees per second (paused off-screen / with reduced motion). */
		spin?: number;
		/** Optional image clipped into the shape. Without it the shape is filled with `currentColor`. */
		image?: string;
		alt?: string;
		/** With an image: width of a frame (in % of the size) filled with `currentColor` around it. */
		frame?: number;
		/** M3 spring parameters — defaults to the Expressive "fast spatial" spring. */
		stiffness?: number;
		dampingRatio?: number;
		class?: string;
		style?: string;
	}

	let {
		shape,
		rotation = 0,
		spin = 0,
		image,
		alt = '',
		frame = 0,
		stiffness = 800,
		dampingRatio = 0.6,
		class: className = '',
		style = ''
	}: Props = $props();

	const uid = $props.id();

	// untrack: these only seed the animation state; later changes go through the effects below.
	let fromRadii = untrack(() => radiiFor(shape));
	let toRadii = fromRadii;
	const progress = untrack(() => new Spring(1, stiffness, dampingRatio));
	const angle = untrack(() => new Spring(rotation, stiffness, dampingRatio));
	let spinAngle = 0;

	let d = $state(untrack(() => radiiToPath(fromRadii, rotation)));

	const frameInset = $derived(frame / 100);

	let svgEl: SVGSVGElement;
	let rafId = 0;
	let lastTime = 0;
	let visible = true;
	let reducedMotion = false;

	const spinning = () => spin !== 0 && visible && !reducedMotion;

	function render() {
		d = radiiToPath(lerpRadii(fromRadii, toRadii, progress.value), angle.value + spinAngle);
	}

	function tick(now: number) {
		const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
		lastTime = now;
		progress.step(dt);
		angle.step(dt);
		if (spinning()) spinAngle = (spinAngle + spin * dt) % 360;
		render();

		if (!progress.settled || !angle.settled || spinning()) {
			rafId = requestAnimationFrame(tick);
		} else {
			rafId = 0;
			lastTime = 0;
		}
	}

	function start() {
		if (typeof window === 'undefined' || rafId) return;
		lastTime = 0;
		rafId = requestAnimationFrame(tick);
	}

	// Shape changes: morph from wherever the outline currently is.
	$effect(() => {
		const next = radiiFor(shape);
		untrack(() => {
			if (next === toRadii) return;
			fromRadii = lerpRadii(fromRadii, toRadii, progress.value);
			toRadii = next;
			progress.value = reducedMotion ? 1 : 0;
			progress.velocity = 0;
			progress.target = 1;
			render();
			start();
		});
	});

	$effect(() => {
		const target = rotation;
		untrack(() => {
			if (target === angle.target) return;
			angle.target = target;
			if (reducedMotion) angle.value = target;
			start();
		});
	});

	onMount(() => {
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = motionQuery.matches;
		const onMotionChange = (e: MediaQueryListEvent) => (reducedMotion = e.matches);
		motionQuery.addEventListener('change', onMotionChange);

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible && spin) start();
		});
		observer.observe(svgEl);

		start();

		return () => {
			observer.disconnect();
			motionQuery.removeEventListener('change', onMotionChange);
			cancelAnimationFrame(rafId);
			rafId = 0;
		};
	});
</script>

<svg
	bind:this={svgEl}
	viewBox="0 0 1 1"
	class="morph-shape {className}"
	{style}
	role={image ? 'img' : 'presentation'}
	aria-label={image ? alt : undefined}
	aria-hidden={image ? undefined : 'true'}
>
	{#if image}
		<defs>
			<clipPath id="{uid}-clip">
				<path
					{d}
					transform={frameInset
						? `translate(${frameInset} ${frameInset}) scale(${1 - 2 * frameInset})`
						: undefined}
				/>
			</clipPath>
		</defs>
		{#if frameInset}
			<path {d} fill="currentColor" />
		{/if}
		<image
			href={image}
			width="1"
			height="1"
			preserveAspectRatio="xMidYMid slice"
			clip-path="url(#{uid}-clip)"
		/>
	{:else}
		<path {d} fill="currentColor" />
	{/if}
</svg>

<style>
	.morph-shape {
		display: block;
		overflow: visible;
	}
</style>

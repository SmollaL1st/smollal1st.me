/**
 * Material 3 Expressive shape library.
 *
 * Every shape is a polar radius function r(θ) ∈ (0, 1], sampled at the same fixed set of
 * angles. Because all shapes share those sample angles, morphing between any two of them is a
 * plain per-sample interpolation, and rotating one is just an angle offset. That gives us
 * M3E-style shape morphing (like the loading indicator) without a polygon-matching library.
 */

const SAMPLES = 120;
const TAU = Math.PI * 2;

type RadiusFn = (theta: number) => number;

/** Smooth lobed shapes: cookies, clovers, suns, bursts, flowers. */
function lobes(count: number, depth: number, sharpness: number): RadiusFn {
	return (t) => {
		const valley = (1 - Math.cos(count * t)) / 2; // 0 at a lobe peak, 1 in a valley
		return 1 - depth * Math.pow(valley, sharpness);
	};
}

/** Rounded regular polygons (Lamé/superformula curve). */
function roundedPolygon(sides: number, roundness: number): RadiusFn {
	return (t) => {
		const a = (sides * t) / 4;
		return Math.pow(
			Math.pow(Math.abs(Math.cos(a)), roundness) + Math.pow(Math.abs(Math.sin(a)), roundness),
			-1 / roundness
		);
	};
}

const SHAPE_DEFS = {
	circle: () => 1,
	square: roundedPolygon(4, 5),
	triangle: roundedPolygon(3, 3.2),
	pentagon: roundedPolygon(5, 4.5),
	cookie4: lobes(4, 0.16, 1.6),
	cookie6: lobes(6, 0.13, 1.6),
	cookie7: lobes(7, 0.12, 1.6),
	cookie9: lobes(9, 0.1, 1.6),
	cookie12: lobes(12, 0.07, 1.5),
	clover4: lobes(4, 0.42, 2.4),
	flower: lobes(8, 0.26, 2),
	sunny: lobes(8, 0.12, 0.85),
	verySunny: lobes(8, 0.22, 0.8),
	softBurst: lobes(10, 0.16, 0.9),
	burst: lobes(12, 0.22, 0.6)
} satisfies Record<string, RadiusFn>;

export type ShapeName = keyof typeof SHAPE_DEFS;
export type Radii = Float32Array;

const cache = new Map<ShapeName, Radii>();

/** Sampled radii for a named shape, normalized so the furthest point touches the unit circle. */
export function radiiFor(name: ShapeName): Radii {
	let radii = cache.get(name);
	if (radii) return radii;

	const fn: RadiusFn = SHAPE_DEFS[name];
	radii = new Float32Array(SAMPLES);
	let max = 0;
	for (let i = 0; i < SAMPLES; i++) {
		radii[i] = fn((i / SAMPLES) * TAU);
		max = Math.max(max, radii[i]);
	}
	for (let i = 0; i < SAMPLES; i++) radii[i] /= max;

	cache.set(name, radii);
	return radii;
}

/** Interpolates two shapes. `t` may overshoot [0, 1] — that is what makes springs feel squishy. */
export function lerpRadii(a: Radii, b: Radii, t: number): Radii {
	if (t === 1) return b;
	if (t === 0) return a;
	const out = new Float32Array(SAMPLES);
	for (let i = 0; i < SAMPLES; i++) out[i] = a[i] + (b[i] - a[i]) * t;
	return out;
}

const fmt = (n: number) => (Math.round(n * 1e4) / 1e4).toString();

/**
 * Builds a closed, smooth SVG path (Catmull-Rom → cubic Bézier) inside a `size × size` box.
 * `rotation` is in degrees; 0 puts the first lobe/corner at 12 o'clock.
 */
export function radiiToPath(radii: Radii, rotation = 0, size = 1): string {
	const half = size / 2;
	const offset = (rotation * Math.PI) / 180 - Math.PI / 2;
	const xs = new Float64Array(SAMPLES);
	const ys = new Float64Array(SAMPLES);
	for (let i = 0; i < SAMPLES; i++) {
		const angle = (i / SAMPLES) * TAU + offset;
		xs[i] = half + half * radii[i] * Math.cos(angle);
		ys[i] = half + half * radii[i] * Math.sin(angle);
	}

	let d = `M${fmt(xs[0])} ${fmt(ys[0])}`;
	for (let i = 0; i < SAMPLES; i++) {
		const i0 = (i - 1 + SAMPLES) % SAMPLES;
		const i2 = (i + 1) % SAMPLES;
		const i3 = (i + 2) % SAMPLES;
		const c1x = xs[i] + (xs[i2] - xs[i0]) / 6;
		const c1y = ys[i] + (ys[i2] - ys[i0]) / 6;
		const c2x = xs[i2] - (xs[i3] - xs[i]) / 6;
		const c2y = ys[i2] - (ys[i3] - ys[i]) / 6;
		d += `C${fmt(c1x)} ${fmt(c1y)} ${fmt(c2x)} ${fmt(c2y)} ${fmt(xs[i2])} ${fmt(ys[i2])}`;
	}
	return d + 'Z';
}

export function shapePath(name: ShapeName, rotation = 0, size = 1): string {
	return radiiToPath(radiiFor(name), rotation, size);
}

/**
 * Damped harmonic spring using the M3 motion parameters (stiffness + damping ratio, mass 1).
 * M3 Expressive presets: fast spatial 800/0.6, default spatial 380/0.8, slow spatial 200/0.8.
 */
export class Spring {
	value: number;
	target: number;
	velocity = 0;
	stiffness: number;
	dampingRatio: number;

	constructor(value: number, stiffness = 380, dampingRatio = 0.8) {
		this.value = value;
		this.target = value;
		this.stiffness = stiffness;
		this.dampingRatio = dampingRatio;
	}

	step(dt: number) {
		const damping = 2 * this.dampingRatio * Math.sqrt(this.stiffness);
		const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
		const h = dt / steps;
		for (let i = 0; i < steps; i++) {
			const accel = -this.stiffness * (this.value - this.target) - damping * this.velocity;
			this.velocity += accel * h;
			this.value += this.velocity * h;
		}
		if (this.settled) {
			this.value = this.target;
			this.velocity = 0;
		}
	}

	get settled() {
		return Math.abs(this.value - this.target) < 1e-3 && Math.abs(this.velocity) < 1e-3;
	}
}

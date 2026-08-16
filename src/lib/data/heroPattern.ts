export interface RadialPatternItem {
	x: number;
	y: number;
	opacity: number;
	size: number;
	animDelay: number;
}

export const HERO_RADIAL_PATTERN: RadialPatternItem[] = [
	// Inner Ring (radius ~215px)
	{ x: 0, y: -215, opacity: 0.36, size: 36, animDelay: 0.1 },
	{ x: 152, y: -152, opacity: 0.22, size: 36, animDelay: 0.6 },
	{ x: 215, y: 0, opacity: 0.42, size: 36, animDelay: 1.1 },
	{ x: 152, y: 152, opacity: 0.18, size: 36, animDelay: 1.6 },
	{ x: 0, y: 215, opacity: 0.32, size: 36, animDelay: 2.1 },
	{ x: -152, y: 152, opacity: 0.24, size: 36, animDelay: 2.6 },
	{ x: -215, y: 0, opacity: 0.38, size: 36, animDelay: 0.4 },
	{ x: -152, y: -152, opacity: 0.2, size: 36, animDelay: 0.9 },

	// Outer Ring (radius ~315px, staggered)
	{ x: 120, y: -290, opacity: 0.26, size: 38, animDelay: 1.3 },
	{ x: 290, y: -120, opacity: 0.16, size: 38, animDelay: 1.8 },
	{ x: 290, y: 120, opacity: 0.34, size: 38, animDelay: 2.3 },
	{ x: 120, y: 290, opacity: 0.2, size: 38, animDelay: 0.3 },
	{ x: -120, y: 290, opacity: 0.3, size: 38, animDelay: 0.8 },
	{ x: -290, y: 120, opacity: 0.14, size: 38, animDelay: 1.4 },
	{ x: -290, y: -120, opacity: 0.4, size: 38, animDelay: 2.0 },
	{ x: -120, y: -290, opacity: 0.18, size: 38, animDelay: 2.5 }
];

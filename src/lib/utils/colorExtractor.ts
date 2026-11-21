/**
 * Material 3 Expressive dynamic color engine.
 *
 * Extracts a source color from the avatar and builds a complete M3 color scheme with
 * Google's @material/material-color-utilities (SchemeExpressive, 2025 color spec). Every role is
 * emitted as an official `--md-sys-color-*` token using `light-dark()`, so a single rule covers
 * both themes and switching only flips `color-scheme`.
 */
import {
	Hct,
	SchemeExpressive,
	MaterialDynamicColors,
	sourceColorFromImageBytes,
	hexFromArgb
} from '@material/material-color-utilities';
import { FAVICON_PATHS } from '#lib/data/logo.ts';
import { shapePath } from '#lib/utils/shapes.ts';

export const COLOR_ROLES = [
	'primary',
	'onPrimary',
	'primaryContainer',
	'onPrimaryContainer',
	'inversePrimary',
	'primaryFixed',
	'primaryFixedDim',
	'onPrimaryFixed',
	'onPrimaryFixedVariant',
	'secondary',
	'onSecondary',
	'secondaryContainer',
	'onSecondaryContainer',
	'secondaryFixed',
	'secondaryFixedDim',
	'onSecondaryFixed',
	'onSecondaryFixedVariant',
	'tertiary',
	'onTertiary',
	'tertiaryContainer',
	'onTertiaryContainer',
	'tertiaryFixed',
	'tertiaryFixedDim',
	'onTertiaryFixed',
	'onTertiaryFixedVariant',
	'error',
	'onError',
	'errorContainer',
	'onErrorContainer',
	'background',
	'onBackground',
	'surface',
	'surfaceDim',
	'surfaceBright',
	'surfaceContainerLowest',
	'surfaceContainerLow',
	'surfaceContainer',
	'surfaceContainerHigh',
	'surfaceContainerHighest',
	'onSurface',
	'surfaceVariant',
	'onSurfaceVariant',
	'outline',
	'outlineVariant',
	'inverseSurface',
	'inverseOnSurface',
	'shadow',
	'scrim',
	'surfaceTint'
] as const;

export type ColorRole = (typeof COLOR_ROLES)[number];
export type ColorScheme = Record<ColorRole, string>;

export interface M3Palette {
	sourceColor: string;
	light: ColorScheme;
	dark: ColorScheme;
}

const PALETTE_STORAGE_KEY = 'm3e-palette';
const FAVICON_STORAGE_KEY = 'm3e-favicon';
const LEGACY_STORAGE_KEYS = ['dynamic-m3-css', 'dynamic-m3-favicon'];

// Seed color sampled from the GitHub avatar; used offline / when the image can't be read.
const FALLBACK_SOURCE_COLOR = 0xff2b4c66;

const dynamicColors = new MaterialDynamicColors();
let cachedPalette: M3Palette | null = null;

function buildScheme(source: Hct, isDark: boolean): ColorScheme {
	const scheme = new SchemeExpressive(source, isDark, 0, '2025');
	const result = {} as ColorScheme;
	for (const role of COLOR_ROLES) {
		result[role] = hexFromArgb(dynamicColors[role]().getArgb(scheme));
	}
	return result;
}

export function buildPalette(sourceArgb: number): M3Palette {
	const source = Hct.fromInt(sourceArgb);
	return {
		sourceColor: hexFromArgb(sourceArgb),
		light: buildScheme(source, false),
		dark: buildScheme(source, true)
	};
}

const toKebab = (role: string) => role.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** `html:root` outranks the static fallback tokens in app.css regardless of stylesheet order. */
export function paletteToCss(palette: M3Palette): string {
	const tokens = COLOR_ROLES.map(
		(role) =>
			`--md-sys-color-${toKebab(role)}:light-dark(${palette.light[role]},${palette.dark[role]});`
	).join('');
	return `html:root{${tokens}}`;
}

/** Samples the dominant (Monet) source color of an image and builds the full palette. */
export async function extractColorFromImage(imageUrl: string): Promise<M3Palette> {
	if (typeof window === 'undefined') return buildPalette(FALLBACK_SOURCE_COLOR);

	let sourceArgb = FALLBACK_SOURCE_COLOR;
	try {
		sourceArgb = await extractViaFetch(imageUrl);
	} catch (fetchError) {
		console.debug('Fetch-based color extraction failed, trying <img> fallback:', fetchError);
		try {
			sourceArgb = await extractViaImageElement(imageUrl);
		} catch (imageError) {
			console.debug('Image element extraction failed, using fallback seed:', imageError);
		}
	}

	cachedPalette = buildPalette(sourceArgb);
	return cachedPalette;
}

async function extractViaFetch(imageUrl: string): Promise<number> {
	const response = await fetch(imageUrl, { mode: 'cors' });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const bitmap = await createImageBitmap(await response.blob());
	return extractFromDrawable(bitmap);
}

function extractViaImageElement(imageUrl: string): Promise<number> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => {
			try {
				resolve(extractFromDrawable(img));
			} catch (err) {
				reject(err);
			}
		};
		img.onerror = reject;
		img.src = imageUrl;
	});
}

function extractFromDrawable(drawable: ImageBitmap | HTMLImageElement): number {
	const size = 128; // downscaled sample keeps quantization fast and non-blocking
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Cannot get 2d canvas context');

	ctx.drawImage(drawable, 0, 0, size, size);
	return sourceColorFromImageBytes(ctx.getImageData(0, 0, size, size).data);
}

/** Favicon: the logo on an M3 Expressive "cookie" shape, tinted with the current palette. */
export function updateDynamicFavicon(palette?: M3Palette, isDark?: boolean) {
	if (typeof document === 'undefined') return;

	if (palette) cachedPalette = palette;
	const active = cachedPalette;
	if (!active) return;

	const dark = isDark ?? document.documentElement.dataset.theme === 'dark';
	const colors = dark ? active.dark : active.light;

	const svg = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${shapePath('cookie9', 0, 128)}" fill="${colors.primaryContainer}"/><g transform="translate(64 64) scale(0.86) translate(-64 -64)" fill="${colors.onPrimaryContainer}"><path d="${FAVICON_PATHS.primary}"/><path d="${FAVICON_PATHS.secondary}"/></g></svg>`;
	const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

	let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
	}
	link.type = 'image/svg+xml';
	link.href = dataUri;

	try {
		localStorage.setItem(FAVICON_STORAGE_KEY, dataUri);
	} catch {}
}

/** Injects the dynamic tokens, caches them for the pre-paint script in app.html, updates the favicon. */
export function applyDynamicM3Palette(palette: M3Palette) {
	if (typeof document === 'undefined') return;

	cachedPalette = palette;
	const css = paletteToCss(palette);

	let styleEl = document.getElementById(PALETTE_STORAGE_KEY) as HTMLStyleElement | null;
	if (!styleEl) {
		styleEl = document.createElement('style');
		styleEl.id = PALETTE_STORAGE_KEY;
		document.head.appendChild(styleEl);
	}
	styleEl.textContent = css;

	try {
		localStorage.setItem(PALETTE_STORAGE_KEY, css);
		for (const key of LEGACY_STORAGE_KEYS) localStorage.removeItem(key);
	} catch {}

	updateDynamicFavicon(palette);
}

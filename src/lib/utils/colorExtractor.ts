/**
 * Dynamic Material 3 Expressive (Monet) Palette Engine using Google's Official @material/material-color-utilities
 */
import {
	sourceColorFromImageBytes,
	themeFromSourceColor,
	hexFromArgb
} from '@material/material-color-utilities';
import { FAVICON_PATHS } from '$lib/data/logo';

export interface M3ThemePalette {
	theme?: any;
	sourceColor: string;
	light: {
		background: string;
		bgSubtle: string;
		surface: string;
		surfaceContainerLow: string;
		surfaceContainer: string;
		surfaceContainerHigh: string;
		surfaceContainerHighest: string;
		textPrimary: string;
		textSecondary: string;
		textTertiary: string;
		accent: string;
		accentHover: string;
		accentContainer: string;
		onAccentContainer: string;
		accentOpacity: string;
		elevationOne: string;
		elevationTwo: string;
		elevationThree: string;
		elevationBorder: string;
		badgeBg: string;
		badgeText: string;
	};
	dark: {
		background: string;
		bgSubtle: string;
		surface: string;
		surfaceContainerLow: string;
		surfaceContainer: string;
		surfaceContainerHigh: string;
		surfaceContainerHighest: string;
		textPrimary: string;
		textSecondary: string;
		textTertiary: string;
		accent: string;
		accentHover: string;
		accentContainer: string;
		onAccentContainer: string;
		accentOpacity: string;
		elevationOne: string;
		elevationTwo: string;
		elevationThree: string;
		elevationBorder: string;
		badgeBg: string;
		badgeText: string;
	};
}

let cachedPalette: M3ThemePalette | null = null;

// Built-in fallback ARGB source color for Stanislav's avatar in case of network/offline issues
const FALLBACK_SOURCE_COLOR = 0xff9d7a39; // Warm golden/amber tone

/**
 * Builds the comprehensive M3ThemePalette from an ARGB source color
 */
function buildPaletteFromSource(sourceArgb: number): M3ThemePalette {
	const theme = themeFromSourceColor(sourceArgb);
	const { schemes, palettes } = theme;

	return {
		theme,
		sourceColor: hexFromArgb(sourceArgb),
		light: {
			background: hexFromArgb(schemes.light.background),
			bgSubtle: hexFromArgb(palettes.neutral.tone(94)),
			surface: hexFromArgb(schemes.light.surface),
			surfaceContainerLow: hexFromArgb(palettes.neutral.tone(96)),
			surfaceContainer: hexFromArgb(palettes.neutral.tone(92)),
			surfaceContainerHigh: hexFromArgb(palettes.neutral.tone(88)),
			surfaceContainerHighest: hexFromArgb(palettes.neutral.tone(84)),
			textPrimary: hexFromArgb(schemes.light.onSurface),
			textSecondary: hexFromArgb(schemes.light.onSurfaceVariant),
			textTertiary: hexFromArgb(schemes.light.outline),
			accent: hexFromArgb(schemes.light.primary),
			accentHover: hexFromArgb(palettes.primary.tone(35)),
			accentContainer: hexFromArgb(schemes.light.primaryContainer),
			onAccentContainer: hexFromArgb(schemes.light.onPrimaryContainer),
			accentOpacity: `${hexFromArgb(schemes.light.primary)}20`,
			elevationOne: hexFromArgb(palettes.neutral.tone(92)),
			elevationTwo: hexFromArgb(palettes.neutral.tone(88)),
			elevationThree: hexFromArgb(palettes.neutral.tone(84)),
			elevationBorder: `${hexFromArgb(schemes.light.outlineVariant)}45`,
			badgeBg: hexFromArgb(palettes.neutral.tone(88)),
			badgeText: hexFromArgb(schemes.light.onSurfaceVariant)
		},
		dark: {
			background: hexFromArgb(schemes.dark.background),
			bgSubtle: hexFromArgb(palettes.neutral.tone(8)),
			surface: hexFromArgb(schemes.dark.surface),
			surfaceContainerLow: hexFromArgb(palettes.neutral.tone(10)),
			surfaceContainer: hexFromArgb(palettes.neutral.tone(14)),
			surfaceContainerHigh: hexFromArgb(palettes.neutral.tone(18)),
			surfaceContainerHighest: hexFromArgb(palettes.neutral.tone(22)),
			textPrimary: hexFromArgb(schemes.dark.onSurface),
			textSecondary: hexFromArgb(schemes.dark.onSurfaceVariant),
			textTertiary: hexFromArgb(schemes.dark.outline),
			accent: hexFromArgb(schemes.dark.primary),
			accentHover: hexFromArgb(palettes.primary.tone(85)),
			accentContainer: hexFromArgb(schemes.dark.primaryContainer),
			onAccentContainer: hexFromArgb(schemes.dark.onPrimaryContainer),
			accentOpacity: `${hexFromArgb(schemes.dark.primary)}26`,
			elevationOne: hexFromArgb(palettes.neutral.tone(10)),
			elevationTwo: hexFromArgb(palettes.neutral.tone(14)),
			elevationThree: hexFromArgb(palettes.neutral.tone(22)),
			elevationBorder: `${hexFromArgb(schemes.dark.outlineVariant)}40`,
			badgeBg: hexFromArgb(palettes.neutral.tone(18)),
			badgeText: hexFromArgb(schemes.dark.onSurfaceVariant)
		}
	};
}

/**
 * Extracts dominant Monet color from an image URL using a fast, non-blocking 128x128 canvas
 */
export async function extractColorFromImage(imageUrl: string): Promise<M3ThemePalette> {
	if (typeof window === 'undefined') {
		return buildPaletteFromSource(FALLBACK_SOURCE_COLOR);
	}

	try {
		// Method 1: Fetch as blob with CORS mode (safest against canvas tainting)
		const sourceArgb = await extractViaFetch(imageUrl);
		const palette = buildPaletteFromSource(sourceArgb);
		cachedPalette = palette;
		return palette;
	} catch (e1) {
		console.debug('Fetch-based color extraction failed, trying Image element fallback:', e1);
		try {
			// Method 2: Standard Image element fallback
			const sourceArgb = await extractViaImageElement(imageUrl);
			const palette = buildPaletteFromSource(sourceArgb);
			cachedPalette = palette;
			return palette;
		} catch (e2) {
			console.debug('Image element extraction failed, using avatar fallback:', e2);
			// Method 3: Deterministic fallback from avatar key colors
			const palette = buildPaletteFromSource(FALLBACK_SOURCE_COLOR);
			cachedPalette = palette;
			return palette;
		}
	}
}

async function extractViaFetch(imageUrl: string): Promise<number> {
	const response = await fetch(imageUrl, { mode: 'cors' });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const blob = await response.blob();

	let imageSource: ImageBitmap | HTMLImageElement;
	if (typeof createImageBitmap === 'function') {
		imageSource = await createImageBitmap(blob);
	} else {
		imageSource = await new Promise<HTMLImageElement>((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = URL.createObjectURL(blob);
		});
	}

	return extractFromDrawable(imageSource);
}

function extractViaImageElement(imageUrl: string): Promise<number> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'Anonymous';
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
	const canvas = document.createElement('canvas');
	const size = 128; // Scaled sample for ultra-fast, non-blocking extraction
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Cannot get 2d canvas context');

	ctx.drawImage(drawable, 0, 0, size, size);
	const imageData = ctx.getImageData(0, 0, size, size);
	return sourceColorFromImageBytes(imageData.data);
}

export function updateDynamicFavicon(palette?: M3ThemePalette, isDark?: boolean) {
	if (typeof document === 'undefined') return;

	if (palette) {
		cachedPalette = palette;
	}
	const activePalette = palette || cachedPalette;
	if (!activePalette) return;

	const dark =
		typeof isDark === 'boolean'
			? isDark
			: document.documentElement.getAttribute('data-theme') === 'dark' ||
				(!document.documentElement.getAttribute('data-theme') &&
					window.matchMedia('(prefers-color-scheme: dark)').matches);

	const colors = dark ? activePalette.dark : activePalette.light;
	const bgColor = colors.surfaceContainer;
	const glyphColor = colors.accent;

	const svgString = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="42" fill="${bgColor}"/><path d="${FAVICON_PATHS.primary}" fill="${glyphColor}"/><path d="${FAVICON_PATHS.secondary}" fill="${glyphColor}"/></svg>`;

	let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
	}
	const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
	link.type = 'image/svg+xml';
	link.href = dataUri;

	try {
		localStorage.setItem('dynamic-m3-favicon', dataUri);
	} catch (_) {}
}

/**
 * Injects dynamic Monet CSS custom properties with maximum specificity (:root[data-theme='...'])
 * and moves the style tag to the end of <head> so it takes precedence over static styles.
 */
export function applyDynamicM3Palette(palette: M3ThemePalette) {
	if (typeof document === 'undefined') return;

	cachedPalette = palette;
	const { light, dark } = palette;

	let styleEl = document.getElementById('dynamic-m3-palette') as HTMLStyleElement | null;
	if (!styleEl) {
		styleEl = document.createElement('style');
		styleEl.id = 'dynamic-m3-palette';
	}

	const cssContent = `
		:root[data-theme="dark"], html[data-theme="dark"] {
			--theme: dark;
			--bg-color: ${dark.background};
			--bg-subtle: ${dark.bgSubtle};
			--surface: ${dark.surface};
			--surface-container-low: ${dark.surfaceContainerLow};
			--surface-container: ${dark.surfaceContainer};
			--surface-container-high: ${dark.surfaceContainerHigh};
			--surface-container-highest: ${dark.surfaceContainerHighest};
			
			--text-primary: ${dark.textPrimary};
			--text-secondary: ${dark.textSecondary};
			--text-tertiary: ${dark.textTertiary};
			
			--accent: ${dark.accent};
			--accent-hover: ${dark.accentHover};
			--accent-container: ${dark.accentContainer};
			--on-accent-container: ${dark.onAccentContainer};
			--accent-opacity: ${dark.accentOpacity};
			
			--elevation-one: ${dark.elevationOne};
			--elevation-two: ${dark.elevationTwo};
			--elevation-three: ${dark.elevationThree};
			--elevation-border: ${dark.elevationBorder};
			--badge-bg: ${dark.badgeBg};
			--badge-text: ${dark.badgeText};
		}

		:root[data-theme="light"], html[data-theme="light"] {
			--theme: light;
			--bg-color: ${light.background};
			--bg-subtle: ${light.bgSubtle};
			--surface: ${light.surface};
			--surface-container-low: ${light.surfaceContainerLow};
			--surface-container: ${light.surfaceContainer};
			--surface-container-high: ${light.surfaceContainerHigh};
			--surface-container-highest: ${light.surfaceContainerHighest};
			
			--text-primary: ${light.textPrimary};
			--text-secondary: ${light.textSecondary};
			--text-tertiary: ${light.textTertiary};
			
			--accent: ${light.accent};
			--accent-hover: ${light.accentHover};
			--accent-container: ${light.accentContainer};
			--on-accent-container: ${light.onAccentContainer};
			--accent-opacity: ${light.accentOpacity};
			
			--elevation-one: ${light.elevationOne};
			--elevation-two: ${light.elevationTwo};
			--elevation-three: ${light.elevationThree};
			--elevation-border: ${light.elevationBorder};
			--badge-bg: ${light.badgeBg};
			--badge-text: ${light.badgeText};
		}
	`;

	styleEl.textContent = cssContent;
	// Always append to end of head to beat any preceding stylesheet links
	document.head.appendChild(styleEl);

	// Cache CSS in localStorage to prevent any color flash on future loads
	try {
		localStorage.setItem('dynamic-m3-css', cssContent);
	} catch (_) {}

	// Automatically update dynamic favicon in browser tab & cache it
	updateDynamicFavicon(palette);
}

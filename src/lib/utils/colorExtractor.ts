/**
 * Dynamic Material 3 Expressive Palette Engine using Google's Official @material/material-color-utilities
 */

export interface M3ThemePalette {
	theme?: any;
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
		elevationBorder: string;
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
		elevationBorder: string;
	};
}

let cachedPalette: M3ThemePalette | null = null;

export async function extractColorFromImage(imageUrl: string): Promise<M3ThemePalette> {
	if (typeof window === 'undefined') {
		throw new Error('Color extraction is only supported in client environment');
	}

	const { themeFromImage, hexFromArgb } = await import('@material/material-color-utilities');

	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'Anonymous';
		img.src = imageUrl;

		img.onload = async () => {
			try {
				const theme = await themeFromImage(img);
				const { schemes, palettes } = theme;

				const palette: M3ThemePalette = {
					theme,
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
						elevationBorder: hexFromArgb(schemes.light.outlineVariant)
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
						elevationBorder: hexFromArgb(schemes.dark.outlineVariant)
					}
				};

				cachedPalette = palette;
				resolve(palette);
			} catch (err) {
				reject(err);
			}
		};

		img.onerror = (err) => {
			reject(err);
		};
	});
}

import { FAVICON_PATHS } from '$lib/data/logo';

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

export function applyDynamicM3Palette(palette: M3ThemePalette) {
	if (typeof document === 'undefined') return;

	cachedPalette = palette;
	const { light, dark } = palette;

	let styleEl = document.getElementById('dynamic-m3-palette') as HTMLStyleElement | null;
	if (!styleEl) {
		styleEl = document.createElement('style');
		styleEl.id = 'dynamic-m3-palette';
		document.head.appendChild(styleEl);
	}

	const cssContent = `
		:root, [data-theme="dark"] {
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
			--accent-opacity: ${dark.accent}26;
			
			--elevation-one: ${dark.surfaceContainerLow};
			--elevation-two: ${dark.surfaceContainer};
			--elevation-three: ${dark.surfaceContainerHighest};
			--elevation-border: ${dark.elevationBorder}40;
		}

		[data-theme="light"] {
			--bg-color: ${light.background};
			--bg-subtle: ${light.bgSubtle};
			--surface: #ffffff;
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
			--accent-opacity: ${light.accent}20;
			
			--elevation-one: ${light.surfaceContainer};
			--elevation-two: ${light.surfaceContainerHigh};
			--elevation-three: ${light.surfaceContainerHighest};
			--elevation-border: ${light.elevationBorder}45;
		}
	`;

	styleEl.textContent = cssContent;

	// Cache CSS in localStorage to prevent any color flash/jump on future loads
	try {
		localStorage.setItem('dynamic-m3-css', cssContent);
	} catch (_) {}

	// Automatically update dynamic favicon in browser tab & cache it
	updateDynamicFavicon(palette);
}

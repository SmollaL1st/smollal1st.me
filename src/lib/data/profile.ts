import type { SocialLink, Project, NavItem } from '$lib/types';

export const PROFILE = {
	name: 'Smo//a L!st',
	displayName: 'SmollaL1st',
	handle: 'SmollaL1st',
	role: 'Software Engineer & UI/UX Craftsman',
	subtitle: 'Crafting thoughtful digital interfaces, full-stack applications & open source tools.',
	bio: `Hey! I'm SmollaL1st, a developer with a deep love for tactile user experiences, clean architecture, and modern web design. I enjoy building snappy, aesthetic applications with SvelteKit, TypeScript, and modern web technologies. Always experimenting with physics-based UI, motion, and system ergonomics.`,
	location: 'Europe',
	timezone: 'Europe/Kyiv',
	discordId: '651391077269372938',
	avatarUrl: 'https://avatars.githubusercontent.com/SmollaL1st?size=1024'
};

export const NAV_ITEMS: NavItem[] = [
	{ label: '/', href: '#home', icon: 'home' },
	{ label: 'about', href: '#about', icon: 'user' },
	{ label: 'projects', href: '#projects', icon: 'layers' }
];

export const SOCIAL_LINKS: SocialLink[] = [
	{
		name: 'GitHub',
		url: 'https://github.com/SmollaL1st',
		icon: 'github'
	},
	{
		name: 'Discord',
		url: 'https://discord.com/users/651391077269372938',
		icon: 'discord'
	},
	{
		name: 'Instagram',
		url: 'https://instagram.com/smolla_l1st',
		icon: 'instagram'
	},
	{
		name: 'Steam',
		url: 'https://steamcommunity.com/id/SmollaL1st',
		icon: 'steam'
	},
	{
		name: 'Mastodon',
		url: 'https://mastodon.social/@SmollaL1st',
		icon: 'mastodon'
	}
];

export const PROJECTS: Project[] = [
	{
		title: 'smollal1st.me V5',
		description:
			'A personal portfolio created using the expressive aesthetic of Material 3, dynamic image-based color extraction, and a real-time Discord presence.',
		badge: 'Current',
		tags: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Vite', 'Cloudflare'],
		showIcons: true,
		links: {
			github: 'https://github.com/SmollaL1st/smollal1st.me'
		}
	},
	{
		title: 'Standard Engine',
		description:
			'A flag engine and heraldic visual tool built with spring physics and reactive rendering.',
		badge: 'Open Source',
		tags: ['Svelte 5', 'TypeScript', 'Spring Physics'],
		showIcons: true,
		links: {
			github: 'https://github.com/SmollaL1st/StandardEngine',
			demo: 'https://smollal1st.github.io/StandardEngine/'
		}
	},
	{
		title: 'Hetmans Room',
		description:
			'A messenger for internal needs, similar to Telegram and Discord, but with its own peculiarities. It is currently a closed project.',
		badge: 'Close',
		tags: ['Kotlin', 'Ktor', 'Android', 'Material 3', 'Tauri'],
		showIcons: true
	},
	{
		title: 'Sunsebook',
		description:
			'An attempt was made to create a social network in the form of a book, but the project was abandoned.',
		badge: 'Abandoned',
		tags: ['SvelteKit', 'Svelte 5', 'Postgresql'],
		showIcons: true
	},
	{
		title: 'Update Center',
		description: 'Trying to make updates OTA',
		badge: 'Abandoned',
		tags: ['Flutter', 'Dart'],
		showIcons: true,
		links: {
			github: 'https://github.com/Smolla-ITc/update_center'
		}
	},
	{
		title: 'Visual Cache',
		description:
			'A package for viewing and calculating the cache in an application. The code is extremely hacky and poorly written.',
		badge: 'Abandoned',
		tags: ['Flutter', 'Dart'],
		showIcons: true,
		links: {
			github: 'https://github.com/Smolla-ITc/visual_cache'
		}
	}
];

export interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

export type BadgeVariant = 'wip' | 'closed' | 'abandoned' | 'opensource' | 'default';

export interface ProjectBadgeConfig {
	label: string;
	variant?: BadgeVariant;
}

export type ProjectBadge = string | ProjectBadgeConfig;

export interface Project {
	title: string;
	description: string;
	badge?: ProjectBadge;
	tags: string[];
	showIcons?: boolean;
	links?: {
		github?: string;
		demo?: string;
		external?: string;
	};
}

export interface NavItem {
	label: string;
	href: string;
	icon: string;
}

export interface LanyardData {
	discord_user: {
		id: string;
		username: string;
		discriminator: string;
		avatar: string;
		global_name?: string;
		display_name?: string;
	};
	discord_status: 'online' | 'idle' | 'dnd' | 'offline';
	active_on_discord_web?: boolean;
	active_on_discord_desktop?: boolean;
	active_on_discord_mobile?: boolean;
	activities?: Array<{
		name: string;
		type: number;
		state?: string;
		details?: string;
		timestamps?: {
			start?: number;
			end?: number;
		};
		assets?: {
			large_image?: string;
			large_text?: string;
			small_image?: string;
			small_text?: string;
		};
	}>;
}

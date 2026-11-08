export type ResolutionCategory = 'mobile' | 'tablet' | 'laptop';

export interface ResolutionProfile {
	id: string;
	label: string;
	width: number;
	height: number;
	category: ResolutionCategory;
}

export const AUTO_TARGET_ID = 'auto';

export const RESOLUTION_PROFILES: ResolutionProfile[] = [
	{
		id: 'mobile',
		label: 'Mobile · 9:16',
		width: 1080,
		height: 1920,
		category: 'mobile',
	},
	{
		id: 'tablet',
		label: 'Tablet · 4:3',
		width: 2048,
		height: 1536,
		category: 'tablet',
	},
	{
		id: 'laptop',
		label: 'Laptop · 16:9',
		width: 1920,
		height: 1080,
		category: 'laptop',
	},
];

export const DEFAULT_TARGET_ID = 'laptop';

const TARGET_MOBILE_TABLET_MIDPOINT = (9 / 16 + 4 / 3) / 2;
const TARGET_TABLET_LAPTOP_MIDPOINT = (4 / 3 + 16 / 9) / 2;

export function profileAspect(profile: ResolutionProfile): number {
	return profile.width / profile.height;
}

export function getProfile(id: string): ResolutionProfile | undefined {
	return RESOLUTION_PROFILES.find((profile) => profile.id === id);
}

export function isProfileId(id: string): boolean {
	return RESOLUTION_PROFILES.some((profile) => profile.id === id);
}

export function resolveProfile(targetId: string): ResolutionProfile {
	if (targetId === AUTO_TARGET_ID) {
		return detectProfile();
	}
	return getProfile(targetId) ?? detectProfile();
}

export function detectProfile(): ResolutionProfile {
	if (typeof window === 'undefined') {
		return getProfile(DEFAULT_TARGET_ID) as ResolutionProfile;
	}

	const { width, height } = window.screen;
	if (width <= 0 || height <= 0) {
		return getProfile(DEFAULT_TARGET_ID) as ResolutionProfile;
	}

	const ratio = width / height;
	if (ratio < TARGET_MOBILE_TABLET_MIDPOINT) {
		return getProfile('mobile') as ResolutionProfile;
	}
	if (ratio < TARGET_TABLET_LAPTOP_MIDPOINT) {
		return getProfile('tablet') as ResolutionProfile;
	}
	return getProfile('laptop') as ResolutionProfile;
}

const SITE_BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
const VIDEO_BASE_URL = (process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? "").trim().replace(/\/+$/, "");
const VIDEO_URL_MAP_RAW = process.env.NEXT_PUBLIC_VIDEO_URL_MAP ?? "";

let cachedVideoUrlMap: Record<string, string> | null = null;

const DEFAULT_VIDEO_URL_MAP: Record<string, string> = {
	"praxis1-interview":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/Interview.mp4",
	"praxis1-depressurization-test":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/Praxis1_Depressurization_Test.mp4",
	"praxis1-slider-animation":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/Praxis1_Slider_Animation.mp4",
	"praxis1-water-opener-sound-test":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/Praxis1_Water_Opener_Sound_Test.mp4",
	"civ102-build-review-video":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/CIV102_Build_Review.mp4",
	"civ102-bridge-testing-video":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/bridge-testing-video.MOV",
	"praxis1-functional-slider":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/slider.mov",
	"praxis1-functional-water-opener":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/water-opener.mov",
	"praxis1-functional-rubber-tab":
		"https://snprmafeymodxoduviut.supabase.co/storage/v1/object/public/Videos/rubber-tab.mov",
};

export const withBasePath = (path: string) => {
	if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("data:")) {
		return path;
	}

	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return `${SITE_BASE_PATH}${normalizedPath}`;
};

const getVideoUrlMap = () => {
	if (cachedVideoUrlMap !== null) {
		return cachedVideoUrlMap;
	}

	if (!VIDEO_URL_MAP_RAW) {
		cachedVideoUrlMap = DEFAULT_VIDEO_URL_MAP;
		return cachedVideoUrlMap;
	}

	try {
		const parsed = JSON.parse(VIDEO_URL_MAP_RAW) as unknown;

		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			cachedVideoUrlMap = DEFAULT_VIDEO_URL_MAP;
			return cachedVideoUrlMap;
		}

		const parsedMap = Object.fromEntries(
			Object.entries(parsed).filter(
				([key, value]) => Boolean(key) && typeof value === "string" && Boolean(value.trim()),
			),
		);
		cachedVideoUrlMap = {
			...DEFAULT_VIDEO_URL_MAP,
			...parsedMap,
		};
		return cachedVideoUrlMap;
	} catch {
		cachedVideoUrlMap = DEFAULT_VIDEO_URL_MAP;
		return cachedVideoUrlMap;
	}
};

export const resolveVideoPath = (videoKey: string, localPath: string) => {
	const mapped = getVideoUrlMap()[videoKey];

	if (mapped) {
		if (mapped.startsWith("http://") || mapped.startsWith("https://")) {
			return mapped;
		}

		return withBasePath(mapped);
	}

	if (VIDEO_BASE_URL) {
		const normalizedPath = localPath.startsWith("/") ? localPath : `/${localPath}`;
		return `${VIDEO_BASE_URL}${normalizedPath}`;
	}

	return withBasePath(localPath);
};

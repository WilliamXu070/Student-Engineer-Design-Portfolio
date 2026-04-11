const SITE_BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
const VIDEO_BASE_URL = (process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? "").trim().replace(/\/+$/, "");
const VIDEO_URL_MAP_RAW = process.env.NEXT_PUBLIC_VIDEO_URL_MAP ?? "";

let cachedVideoUrlMap: Record<string, string> | null = null;

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
		cachedVideoUrlMap = {};
		return cachedVideoUrlMap;
	}

	try {
		const parsed = JSON.parse(VIDEO_URL_MAP_RAW) as unknown;

		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			cachedVideoUrlMap = {};
			return cachedVideoUrlMap;
		}

		cachedVideoUrlMap = Object.fromEntries(
			Object.entries(parsed).filter(
				([key, value]) => Boolean(key) && typeof value === "string" && Boolean(value.trim()),
			),
		);
		return cachedVideoUrlMap;
	} catch {
		cachedVideoUrlMap = {};
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

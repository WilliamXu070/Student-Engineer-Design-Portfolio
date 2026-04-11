const SITE_BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

export const withBasePath = (path: string) => {
	if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("data:")) {
		return path;
	}

	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return `${SITE_BASE_PATH}${normalizedPath}`;
};

"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";

type ReferenceDownloadLinkProps = {
	href: string;
	className?: string;
	children?: ReactNode;
	label?: string;
};

const getFilename = (href: string, disposition: string | null) => {
	const match = disposition?.match(/filename="([^"]+)"/i);

	if (match?.[1]) {
		return match[1];
	}

	const fallback = href.split("/").filter(Boolean).pop();

	return fallback ?? "reference.pdf";
};

const ReferenceDownloadLink = ({
	href,
	className = "",
	children,
	label = "download PDF",
}: ReferenceDownloadLinkProps) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();

		try {
			setIsDownloading(true);

			const response = await fetch(href);

			if (!response.ok) {
				throw new Error(`Failed to download reference: ${response.status}`);
			}

			const blob = await response.blob();
			const objectUrl = URL.createObjectURL(blob);
			const anchor = document.createElement("a");

			anchor.href = objectUrl;
			anchor.download = getFilename(href, response.headers.get("content-disposition"));
			document.body.appendChild(anchor);
			anchor.click();
			anchor.remove();
			URL.revokeObjectURL(objectUrl);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<a href={href} onClick={handleClick} className={className}>
			{isDownloading ? "downloading..." : children ?? label}
		</a>
	);
};

export default ReferenceDownloadLink;

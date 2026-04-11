import type { CSSProperties, ReactNode } from "react";

import { CITE_PATTERN } from "@/app/lib/references";

import InlineCitation from "./InlineCitation";

type CitationTextProps = {
	text: string;
	className?: string;
	style?: CSSProperties;
};

const CitationText = ({ text, className, style }: CitationTextProps) => {
	const nodes: ReactNode[] = [];
	let lastIndex = 0;

	for (const match of text.matchAll(CITE_PATTERN)) {
		const matchIndex = match.index ?? 0;
		const [fullMatch, rawIds] = match;

		if (matchIndex > lastIndex) {
			nodes.push(text.slice(lastIndex, matchIndex));
		}

		nodes.push(
			<InlineCitation
				key={`${rawIds}-${matchIndex}`}
				referenceIds={rawIds.split(",").map((value) => value.trim()).filter(Boolean)}
			/>,
		);

		lastIndex = matchIndex + fullMatch.length;
	}

	if (lastIndex < text.length) {
		nodes.push(text.slice(lastIndex));
	}

	return (
		<span className={className} style={style}>
			{nodes}
		</span>
	);
};

export default CitationText;

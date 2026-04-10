import type { ReferenceAuthor, ReferenceEntry } from "@/app/types/references";

const CITE_PATTERN = /\[\[cite:([A-Za-z0-9._,\-\s]+)\]\]/g;

const compactWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const ensureSentence = (value: string) => {
	const trimmed = compactWhitespace(value);

	if (!trimmed) {
		return "";
	}

	return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

const formatAuthorName = ({ given, family }: ReferenceAuthor) => {
	const initials = given
		.split(/\s+/)
		.filter(Boolean)
		.map((part) => `${part.charAt(0).toUpperCase()}.`)
		.join(" ");

	return compactWhitespace(`${initials} ${family}`);
};

const formatAuthorList = (entry: ReferenceEntry) => {
	if (entry.authors?.length) {
		const authors = entry.authors.map(formatAuthorName);

		if (authors.length === 1) {
			return authors[0];
		}

		if (authors.length === 2) {
			return `${authors[0]} and ${authors[1]}`;
		}

		return `${authors.slice(0, -1).join(", ")}, and ${authors[authors.length - 1]}`;
	}

	return entry.organization;
};

const formatDate = (entry: ReferenceEntry) =>
	compactWhitespace([entry.month, entry.day, entry.year].filter(Boolean).join(" "));

export const getReferenceItemId = (referenceId: string) =>
	`reference-item-${referenceId.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export const extractCitationIds = (text: string) => {
	const referenceIds: string[] = [];

	for (const match of text.matchAll(CITE_PATTERN)) {
		const ids = match[1]
			.split(",")
			.map((value) => value.trim())
			.filter(Boolean);

		for (const referenceId of ids) {
			if (!referenceIds.includes(referenceId)) {
				referenceIds.push(referenceId);
			}
		}
	}

	return referenceIds;
};

export const formatIeeeReference = (
	entry: ReferenceEntry,
	index?: number,
	options?: {
		includeUrl?: boolean;
	},
) => {
	const lead = index ? `[${index}]` : "";
	const includeUrl = options?.includeUrl ?? true;
	const authorSegment = formatAuthorList(entry);
	const titleSegment = entry.type === "book" ? entry.title : `"${entry.title}"`;
	const publicationDetails = compactWhitespace(
		[
			entry.containerTitle,
			entry.volume ? `vol. ${entry.volume}` : "",
			entry.issue ? `no. ${entry.issue}` : "",
			entry.pages ? `pp. ${entry.pages}` : "",
		]
			.filter(Boolean)
			.join(", "),
	);
	const publisherSegment = compactWhitespace([entry.publisher, entry.institution].filter(Boolean).join(", "));
	const dateSegment = formatDate(entry);
	const availabilitySegment = entry.url && includeUrl ? `[Online]. Available: ${entry.url}` : "";
	const doiSegment = entry.doi ? `doi: ${entry.doi}` : "";
	const accessedSegment = entry.accessed ? `Accessed: ${entry.accessed}` : "";
	const noteSegment = entry.note ? ensureSentence(entry.note) : "";

	return [
		lead,
		ensureSentence(authorSegment ?? ""),
		ensureSentence(titleSegment),
		ensureSentence(publicationDetails),
		ensureSentence(publisherSegment),
		ensureSentence(dateSegment),
		ensureSentence(availabilitySegment),
		ensureSentence(doiSegment),
		noteSegment,
		ensureSentence(accessedSegment),
	]
		.filter(Boolean)
		.join(" ");
};

export { CITE_PATTERN };

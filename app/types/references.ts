export type ReferenceAuthor = {
	given: string;
	family: string;
};

export type ReferenceKind =
	| "article"
	| "book"
	| "conference"
	| "report"
	| "thesis"
	| "web"
	| "video"
	| "other";

export type ReferenceEntry = {
	type?: ReferenceKind;
	authors?: ReferenceAuthor[];
	organization?: string;
	year?: string;
	month?: string;
	day?: string;
	title: string;
	containerTitle?: string;
	publisher?: string;
	institution?: string;
	volume?: string;
	issue?: string;
	pages?: string;
	edition?: string;
	url?: string;
	doi?: string;
	accessed?: string;
	note?: string;
};

export type ReferenceLibrary = Record<string, ReferenceEntry>;

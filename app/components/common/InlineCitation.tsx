"use client";

import { useEffect, useMemo } from "react";

import { useReferences } from "./ReferenceProvider";

type InlineCitationProps = {
	referenceIds: string[] | string;
	className?: string;
};

const InlineCitation = ({ referenceIds, className = "" }: InlineCitationProps) => {
	const { getCitationNumber, openReferences, registerCitation, unregisterCitation } = useReferences();
	const normalizedIds = useMemo(
		() => (Array.isArray(referenceIds) ? referenceIds : [referenceIds]).map((value) => value.trim()).filter(Boolean),
		[referenceIds],
	);

	useEffect(() => {
		for (const referenceId of normalizedIds) {
			registerCitation(referenceId);
		}

		return () => {
			for (const referenceId of normalizedIds) {
				unregisterCitation(referenceId);
			}
		};
	}, [normalizedIds, registerCitation, unregisterCitation]);

	const labels = normalizedIds.map((referenceId) => getCitationNumber(referenceId) ?? "?");

	return (
		<a
			href="#references"
			onClick={(event) => {
				event.preventDefault();
				openReferences(normalizedIds[0] ?? null);
			}}
			className={`align-super text-[0.72em] tracking-[0.08em] text-amber-200 underline decoration-white/30 underline-offset-4 hover:text-white ${className}`}>
			[{labels.join(", ")}]
		</a>
	);
};

export default InlineCitation;

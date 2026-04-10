"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { REFERENCE_LIBRARY } from "@/app/constants/references";
import type { ReferenceEntry } from "@/app/types/references";

type RegisteredReference = {
	id: string;
	order: number;
	entry?: ReferenceEntry;
};

type ReferenceContextValue = {
	registerCitation: (referenceId: string) => void;
	unregisterCitation: (referenceId: string) => void;
	getCitationNumber: (referenceId: string) => number | null;
	references: RegisteredReference[];
	missingReferenceIds: string[];
	isDrawerOpen: boolean;
	activeReferenceId: string | null;
	openReferences: (referenceId?: string | null) => void;
	closeReferences: () => void;
};

const ReferenceContext = createContext<ReferenceContextValue | null>(null);

export const ReferenceProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const [citedReferenceIds, setCitedReferenceIds] = useState<string[]>([]);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [activeReferenceId, setActiveReferenceId] = useState<string | null>(null);
	const libraryOrder = useMemo(() => Object.keys(REFERENCE_LIBRARY), []);
	const orderedReferenceIds = useMemo(() => {
		const missingIds = citedReferenceIds.filter((referenceId) => !libraryOrder.includes(referenceId));
		return [...libraryOrder, ...missingIds];
	}, [citedReferenceIds, libraryOrder]);

	useEffect(() => {
		setIsDrawerOpen(false);
		setActiveReferenceId(null);
	}, [pathname]);

	const registerCitation = useCallback((referenceId: string) => {
		setCitedReferenceIds((current) =>
			current.includes(referenceId) ? current : [...current, referenceId],
		);
	}, []);

	const unregisterCitation = useCallback(() => {}, []);

	const references = useMemo(
		() =>
			orderedReferenceIds.map((referenceId, index) => ({
				id: referenceId,
				order: index + 1,
				entry: REFERENCE_LIBRARY[referenceId],
			})),
		[orderedReferenceIds],
	);

	const missingReferenceIds = useMemo(
		() => references.filter((reference) => !reference.entry).map((reference) => reference.id),
		[references],
	);

	const openReferences = useCallback((referenceId?: string | null) => {
		setActiveReferenceId(referenceId ?? null);
		setIsDrawerOpen(true);
	}, []);

	const closeReferences = useCallback(() => {
		setIsDrawerOpen(false);
		setActiveReferenceId(null);
	}, []);

	const value = useMemo<ReferenceContextValue>(
		() => ({
			registerCitation,
			unregisterCitation,
			getCitationNumber: (referenceId: string) => {
				const index = orderedReferenceIds.indexOf(referenceId);
				return index === -1 ? null : index + 1;
			},
			references,
			missingReferenceIds,
			isDrawerOpen,
			activeReferenceId,
			openReferences,
			closeReferences,
		}),
		[
			activeReferenceId,
			closeReferences,
			isDrawerOpen,
			missingReferenceIds,
			openReferences,
			orderedReferenceIds,
			references,
			registerCitation,
			unregisterCitation,
		],
	);

	return <ReferenceContext.Provider value={value}>{children}</ReferenceContext.Provider>;
};

export const useReferences = () => {
	const context = useContext(ReferenceContext);

	if (!context) {
		throw new Error("useReferences must be used within a ReferenceProvider.");
	}

	return context;
};

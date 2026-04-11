"use client";

import { formatIeeeReference, getReferenceItemId } from "@/app/lib/references";

import ReferenceDownloadLink from "./ReferenceDownloadLink";
import { useReferences } from "./ReferenceProvider";

type ReferencesSectionProps = {
	className?: string;
};

const ReferencesSection = ({ className = "" }: ReferencesSectionProps) => {
	const { references, missingReferenceIds } = useReferences();

	if (!references.length) {
		return null;
	}

	return (
		<section
			id="references"
			className={`references-print-section rounded-[1.5rem] border border-black/15 bg-[#efe7d6] p-6 text-black shadow-[10px_10px_0_#000] md:p-8 ${className}`}>
			<p
				className="text-[0.72rem] uppercase tracking-[0.28em] text-black/62"
				style={{ fontFamily: "var(--font-vercetti)" }}>
				References
			</p>
			<h2 className="mt-3 text-3xl text-black" style={{ fontFamily: "var(--font-soria)" }}>
				Bibliography
			</h2>

			<ol className="mt-6 grid gap-4">
				{references.map((reference) => (
					<li
						key={reference.id}
						id={getReferenceItemId(reference.id)}
						className="rounded-[1.1rem] border border-black/10 bg-white/60 px-4 py-4 text-sm leading-7 text-black/78"
						style={{ fontFamily: "var(--font-vercetti)" }}>
						{reference.entry ? (
							<p>
								{formatIeeeReference(reference.entry, reference.order, { includeUrl: false })}
								{reference.entry.url ? (
									<>
										{" "}
										<ReferenceDownloadLink
											href={reference.entry.url}
											className="underline decoration-current underline-offset-4 hover:text-black">
											[download]
										</ReferenceDownloadLink>
									</>
								) : null}
							</p>
						) : (
							<>
								[{reference.order}] Missing reference definition for <code>{reference.id}</code>. Add it to{" "}
								<code>constants/references.ts</code>.
							</>
						)}
					</li>
				))}
			</ol>

			{missingReferenceIds.length ? (
				<p
					className="mt-5 text-xs uppercase tracking-[0.2em] text-rose-700"
					style={{ fontFamily: "var(--font-vercetti)" }}>
					{missingReferenceIds.length} cited source{missingReferenceIds.length === 1 ? "" : "s"} still need a full reference entry.
				</p>
			) : null}
		</section>
	);
};

export default ReferencesSection;

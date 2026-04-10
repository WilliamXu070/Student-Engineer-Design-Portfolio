"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { formatIeeeReference } from "@/app/lib/references";

import FloatingUtilityButton from "./FloatingUtilityButton";
import ReferenceDownloadLink from "./ReferenceDownloadLink";
import { useReferences } from "./ReferenceProvider";

const ReferencesDrawer = () => {
	const backdropRef = useRef<HTMLDivElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLOListElement>(null);
	const { activeReferenceId, closeReferences, isDrawerOpen, missingReferenceIds, openReferences, references } = useReferences();

	useGSAP(() => {
		gsap.set(backdropRef.current, { opacity: 0 });
		gsap.set(panelRef.current, { y: 28, scale: 0.985, opacity: 0 });
	}, []);

	useGSAP(() => {
		if (isDrawerOpen) {
			gsap.to(backdropRef.current, {
				opacity: 1,
				duration: 0.35,
				ease: "power2.out",
			});
			gsap.to(panelRef.current, {
				y: 0,
				scale: 1,
				opacity: 1,
				duration: 0.55,
				ease: "power3.out",
			});
			return;
		}

		gsap.to(backdropRef.current, {
			opacity: 0,
			duration: 0.28,
			ease: "power2.inOut",
		});
		gsap.to(panelRef.current, {
			y: 28,
			scale: 0.985,
			opacity: 0,
			duration: 0.38,
			ease: "power3.inOut",
		});
	}, [isDrawerOpen]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeReferences();
			}
		};

		if (isDrawerOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", onKeyDown);
		}

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [closeReferences, isDrawerOpen]);

	useEffect(() => {
		if (!isDrawerOpen || !activeReferenceId || !listRef.current) {
			return;
		}

		const target = listRef.current.querySelector<HTMLElement>(`[data-reference-id="${activeReferenceId}"]`);

		if (!target) {
			return;
		}

		requestAnimationFrame(() => {
			target.scrollIntoView({
				block: "center",
				behavior: "smooth",
			});
		});
	}, [activeReferenceId, isDrawerOpen, references]);

	return (
		<>
			<FloatingUtilityButton
				onClick={() => (isDrawerOpen ? closeReferences() : openReferences())}
				label="References"
				accentClassName="bg-amber-300"
				meta={`${references.length} listed`}
			/>

			<div
				className={`fixed inset-0 z-[94] ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
				aria-hidden={!isDrawerOpen}>
				<div
					ref={backdropRef}
					className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,92,46,0.18),transparent_35%),rgba(3,6,12,0.62)] backdrop-blur-sm"
					onClick={closeReferences}
				/>

				<div className="absolute inset-0 flex items-center justify-center p-3 md:p-8">
					<aside
						ref={panelRef}
						className="relative h-[min(88vh,48rem)] w-[min(68rem,calc(100vw-1.5rem))] overflow-hidden rounded-[2rem] border border-slate-200/12 bg-[#0a1018] shadow-[0_24px_120px_rgba(0,0,0,0.6)] md:w-[min(74rem,calc(100vw-4rem))]">
						<div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

						<div className="relative z-10 flex h-full flex-col overflow-hidden text-white">
							<div className="sticky top-0 z-20 border-b border-white/10 bg-[#0a1018] px-6 pb-5 pt-6 md:px-10 md:pb-6 md:pt-8">
								<div className="mb-4 flex items-start justify-between gap-4">
									<div>
										<div className="mb-3 text-[0.68rem] uppercase tracking-[0.32em] text-amber-200/90">References</div>
										<h2
											className="max-w-[38rem] text-3xl font-light leading-[1.02] text-white md:text-[3rem]"
											style={{ fontFamily: "var(--font-soria)" }}>
											Bibliography
										</h2>
									</div>
									<button
										onClick={closeReferences}
										className="rounded-full border border-white/12 bg-[#141b24] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-[#1b2633] hover:text-white">
										Close
									</button>
								</div>

							</div>

							<div className="flex-1 overflow-y-auto px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
								{references.length ? (
									<ol ref={listRef} className="mx-auto grid max-w-[52rem] gap-4">
										{references.map((reference) => (
											<li
												key={reference.id}
												data-reference-id={reference.id}
												className={`rounded-[1.35rem] border px-5 py-5 text-sm leading-7 text-slate-100 transition-colors ${
													activeReferenceId === reference.id
														? "border-amber-300/60 bg-[#172231] shadow-[0_0_0_1px_rgba(252,211,77,0.3)]"
														: "border-white/10 bg-[#111925]"
												}`}>
												{reference.entry ? (
													<p>
														{formatIeeeReference(reference.entry, reference.order, { includeUrl: false })}
														{reference.entry.url ? (
															<>
																{" "}
																<ReferenceDownloadLink
																	href={reference.entry.url}
																	className="underline decoration-current underline-offset-4 hover:text-white">
																	[download PDF]
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
								) : (
									<div className="mx-auto max-w-[44rem] rounded-[1.6rem] border border-white/10 bg-[#111925] p-6 md:p-7">
										<p className="text-[0.74rem] uppercase tracking-[0.3em] text-amber-200/85">No references yet</p>
									</div>
								)}

								{missingReferenceIds.length ? (
									<p className="mx-auto mt-6 max-w-[52rem] text-xs uppercase tracking-[0.2em] text-rose-300">
										{missingReferenceIds.length} cited source{missingReferenceIds.length === 1 ? "" : "s"} still need a full reference entry.
									</p>
								) : null}
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	);
};

export default ReferencesDrawer;

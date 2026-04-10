import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
	FigureReferenceText,
	getFigureAnchorId,
	type FigureReferenceMap,
} from "@/app/components/common/FigureReferenceText";
import HidePortalCloseButton from "@/app/components/common/HidePortalCloseButton";
import RememberedBackLink from "@/app/components/common/RememberedBackLink";
import RememberedLink from "@/app/components/common/RememberedLink";
import ReferencesSection from "@/app/components/common/ReferencesSection";
import {
	getFdcrStageLabel,
	getFdcrStageTheme,
	PROJECTS,
	PROJECT_DETAILS,
	WORK_TIMELINE,
} from "@constants";
import type { CtmfDossierSection } from "@/app/types/projects";

type CtmfPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

const stakeholderPraxisSections: CtmfDossierSection[] = [
	{
		title: "Core Claim",
		bullets: [
			"In Praxis I, stakeholder analysis mattered because it expanded the project from a noise-only problem into a broader user-centered engineering problem, and that shift changed what counted as a successful design.",
		],
	},
	{
		title: "CTMF Description / What It Is",
		bullets: [
			"Stakeholder analysis is a framing / representing CTMF that identifies who is affected by a design, what they care about, and how those concerns should be translated into requirements before the project narrows too quickly around one metric.",
			"In Praxis I, it was needed to stop the project from collapsing into noise reduction alone and to keep other user-visible consequences of can opening in view.",
		],
	},
	{
		title: "What I Used The CTMF For In Praxis I / How It Influenced The Project",
		calloutTitle: "What students actually raised",
		callouts: [
			'Interview 1: the can could "burst out" and get contents on the user\'s hands.',
			'Interview 5: "the risk of the can spilling all over the place" was part of what made opening unpleasant.',
			'Interview 6: opening could involve "digging it under the top" with the fingers and taking "very long."',
		],
		figures: [
			{
				src: "/context-evidence/raw/praxis1-stakeholder-contact.png",
				alt: "Praxis I primary stakeholder contact with students holding soda cans during interviews.",
				caption:
					"Primary stakeholder contact is the reason this CTMF mattered. The project did not infer user concerns from the report after the fact; it gathered them directly from students using the product in context.",
			},
			{
				src: "/api/images/praxis1-annotated",
				alt: "Praxis I slider concept render from the final concept direction.",
				caption:
					"The final recommendation became stronger because the slider did not only quiet the opening event. It also better protected the user-facing criteria that stakeholder conversations made visible.",
			},
		],
		bullets: [
			"This early framing was collaborative rather than individual, and those stakeholder conversations expanded the problem beyond simply making the can quieter. The interviews showed that students were responding not just to the sound, but to the entire opening experience: spills, fizz or liquid getting on their hands, awkward finger interaction, and an opening action that felt slow and inconvenient.",
			"Those concerns then changed the engineering definition of success. The project added a beverage-integrity goal, meaning the drink should stay usable and should not spray or spill excessively during opening. In the report, this sentiment became Goal 2, along with a liquid-loss limit of no more than 1% of the drink and a carbonation-loss limit of no more than 1 g after 90 seconds. Ease of use also became more explicit: the opener should take less than 5 seconds, require no more than 3 separate hand actions, keep the peak force below 25 N, and keep concentrated hand pressure below 200 kPa. The related evaluation criteria later tracked these same ideas as spill control, force, pressure, and gesture burden.",
			"This directly influenced convergence. The final recommendation was not justified only by acoustic performance. The slider remained stronger because it did a better job protecting beverage integrity and interaction quality as well: about 0.46% liquid loss, 0.4 g carbonation boil-off, about 80 kPa maximum hand pressure, and only 2 gestures. By contrast, the water opener looked much weaker once those user-facing criteria stayed visible, with about 1.80% liquid loss, 2.3 g carbonation boil-off, about 600 kPa pressure, and 5 gestures.",
		],
	},
	{
		title: "Limitations Of The CTMF",
		figures: [
			{
				kind: "video",
				src: "/api/videos/praxis1-interview",
				alt: "Praxis I stakeholder interview video showing students discussing spills, awkward finger interaction, and opening difficulty.",
				caption:
					"The interview video shows what stakeholder analysis could reveal well: the user-facing frustrations around spills, awkward finger interaction, and opening burden. It clarified what the project needed to protect, but not what physically caused the sharp sound event.",
			},
			{
				kind: "video",
				src: "/api/videos/praxis1",
				posterSrc: "/context-evidence/raw/praxis1-p2-img1.png",
				alt: "Praxis I acoustic testing video showing a phone decibel meter beside a soda can during opening.",
				caption:
					"Stakeholder analysis defined what the design needed to protect, but testing was still required to challenge the original explanation of what physically caused the sound event.",
			},
		],
		bullets: [
			"Stakeholder analysis clarified what success needed to protect, but it did not reveal what physically caused the sound event.",
			"It could not determine whether the dominant issue was depressurization, tear-line fracture, or something else. That required mechanism-level testing and measurement.",
			"In Praxis I, that meant stakeholder analysis gave the project a better frame, but testing was still needed to challenge the original physical explanation and show that the problem could not be solved by stakeholder framing alone.",
		],
	},
	{
		title: "Impact On My Position In Context",
		bullets: [
			"This CTMF fits my preference for explicit, grounded criteria before convergence begins.",
			"It also guarded against one of my main biases: reducing the project to one technically attractive metric. In Praxis I, that metric would have been noise alone.",
			"The deeper lesson for me was that good engineering framing has to keep multiple legitimate definitions of success visible at once, rather than optimizing too early around the clearest technical target.",
		],
	},
	{
		title: "Future Steps",
		bullets: [
			"Use stakeholder analysis early, but make interviews more systematic and map recurring concerns directly into requirements instead of leaving them as loose impressions.",
			"Distinguish between concerns I expected beforehand and concerns that genuinely emerged through stakeholder conversations.",
			"Revisit stakeholder analysis after testing to check whether the project is still protecting what stakeholders actually cared about once the explanation of the problem changes.",
		],
	},
];

const getCtmfData = (slug: string) => {
	const ctmf = PROJECTS.find((entry) => entry.slug === slug);

	if (!ctmf) {
		return null;
	}

	const relatedProjects = WORK_TIMELINE
		.filter((point) => point.selectable !== false && point.slug !== "beyond")
		.map((point) => {
			const detail = PROJECT_DETAILS[point.slug];

			if (!detail?.ctmfRefs.includes(slug)) {
				return null;
			}

			return {
				slug: point.slug,
				year: point.year,
				title: detail.title,
				course: detail.course,
				overview: detail.overview,
			};
		})
		.filter((project): project is NonNullable<typeof project> => project !== null);

	return { ctmf, relatedProjects };
};

export const generateStaticParams = () => {
	return PROJECTS.map((entry) => ({
		slug: entry.slug,
	}));
};

export const generateMetadata = async ({ params }: CtmfPageProps): Promise<Metadata> => {
	const { slug } = await params;
	const data = getCtmfData(slug);

	if (!data) {
		return {
			title: "CTMF Not Found | William",
		};
	}

	return {
		title: `${data.ctmf.title} | CTMF Dossier | William`,
		description: data.ctmf.overview,
	};
};

const getCtmfFigureRefKey = (index: number) => String(index + 1).padStart(2, "0");

const CtmfPage = async ({ params }: CtmfPageProps) => {
	const { slug } = await params;
	const data = getCtmfData(slug);

	if (!data) {
		notFound();
	}

	const { ctmf, relatedProjects } = data;
	const ctmfStageTheme = getFdcrStageTheme(ctmf.stageCode, ctmf.stage);

	return (
		<main className="ctmf-brutalist relative min-h-screen overflow-hidden text-[#f8f3e8]">
			<HidePortalCloseButton />
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40" />
			</div>

			<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 md:px-10 md:py-12">
				<div className="mb-10 flex items-center justify-between gap-4 border-b-[3px] border-black pb-6">
					<RememberedBackLink
						fallbackHref="/?portal=projects"
						fallbackLabel="Back to CTMFs"
						className="neo-chip bg-[#efe7d6] px-4 py-2 text-black hover:-translate-y-1 hover:text-black"
					/>
					<p
						className="neo-chip -rotate-2 bg-[#ffd23c] px-3 py-2 text-right text-xs uppercase tracking-[0.32em] text-black"
						style={{ fontFamily: "var(--font-vercetti)" }}>
						CTMF Dossier
					</p>
				</div>

				<section className="flex flex-col gap-6 border-b-[3px] border-black pb-10 md:pb-14">
					<div>
						<p
							className={`mb-4 inline-block px-3 py-2 text-sm uppercase tracking-[0.34em] ${ctmfStageTheme.indicatorClassName}`}
							style={{ fontFamily: "var(--font-vercetti)" }}>
							{getFdcrStageLabel(ctmf.stageCode, ctmf.stage)}
						</p>
						<h1
							className="max-w-4xl text-4xl leading-[0.92] text-[#f8f3e8] md:text-6xl"
							style={{ fontFamily: "var(--font-soria)" }}>
							{ctmf.title}
						</h1>
						<p
							className="mt-6 max-w-3xl text-base leading-8 text-[#f1eadc] md:text-lg"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							{ctmf.overview}
						</p>
					</div>

					<aside className="neo-panel bg-[#efe7d6] p-6 text-black">
						<p
							className="text-xs uppercase tracking-[0.28em] text-black/70"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							Portfolio Role
						</p>
						<p
							className="mt-3 text-2xl text-black"
							style={{ fontFamily: "var(--font-soria)" }}>
							{ctmf.subtext}
						</p>
						<div className="mt-8 h-[3px] w-full bg-black" />
						<p
							className="mt-8 text-xs uppercase tracking-[0.28em] text-black/70"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							Why It Matters
						</p>
						<p
							className="mt-4 text-sm leading-7 text-black/80"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							{ctmf.whyItMatters}
						</p>
					</aside>
				</section>

				{ctmf.dossiers?.map((dossier) => {
					const isStakeholderPraxis =
						ctmf.slug === "stakeholder-mapping" && dossier.project === "Praxis I";
					const dossierSections =
						isStakeholderPraxis ? stakeholderPraxisSections : dossier.sections;
					const figureScopeKey = `${slug}-${dossier.project}`
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, "-")
						.replace(/^-+|-+$/g, "");
					let figureIndex = 0;
					const numberedSections = dossierSections.map((section) => ({
						...section,
						figures: section.figures?.map((figure) => {
							const refKey = getCtmfFigureRefKey(figureIndex);
							figureIndex += 1;

							return {
								...figure,
								refKey,
								label: `Fig. ${refKey}`,
							};
						}),
					}));
					const dossierFigureReferences: FigureReferenceMap = Object.fromEntries(
						numberedSections.flatMap((section) =>
							(section.figures ?? [])
								.filter(
									(
										figure,
									): figure is NonNullable<(typeof section.figures)>[number] & {
										refKey: string;
										label: string;
									} => "refKey" in figure && "label" in figure,
								)
								.map((figure) => [
									figure.refKey,
									{
										href: `#${getFigureAnchorId(figureScopeKey, figure.refKey)}`,
										label: figure.label,
									},
								]),
						),
					);

					return (
						<section
							key={`${ctmf.slug}-${dossier.project}`}
							className="flex flex-col gap-6 border-b-[3px] border-black py-10 md:py-14">
							<aside className="neo-panel neo-angle bg-[#171a22] p-6 text-[#f8f3e8] md:p-8">
								<p
									className="text-xs uppercase tracking-[0.3em] text-[#ffd23c]"
									style={{ fontFamily: "var(--font-vercetti)" }}>
									{dossier.project} CTMF Dossier
								</p>
								<div className="mt-4 flex items-center gap-3">
									<span
										className={`px-3 py-1 text-[11px] uppercase tracking-[0.26em] ${getFdcrStageTheme(dossier.phaseCode).indicatorClassName}`}
										style={{ fontFamily: "var(--font-vercetti)" }}>
										[{dossier.phaseCode}]
									</span>
									<span
										className="text-[11px] uppercase tracking-[0.28em] text-[#31d7c4]"
										style={{ fontFamily: "var(--font-vercetti)" }}>
										FDCR placement
									</span>
								</div>
								<p
									className="mt-6 text-3xl leading-tight text-[#f8f3e8]"
									style={{ fontFamily: "var(--font-soria)" }}>
									{dossier.claimHeadline}
								</p>
								<p
									className="mt-5 text-sm leading-7 text-[#f1eadc]"
									style={{ fontFamily: "var(--font-vercetti)" }}>
									<FigureReferenceText text={dossier.summary} refs={dossierFigureReferences} />
								</p>
							</aside>

							{dossier.artifacts?.length && !isStakeholderPraxis ? (
								<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
									{dossier.artifacts.map((artifact) => (
										<article
											key={`${dossier.project}-${artifact.title}`}
											className="neo-panel bg-[#171a22] p-5 text-[#f8f3e8]">
											<p
												className="text-[11px] uppercase tracking-[0.28em] text-[#31d7c4]"
												style={{ fontFamily: "var(--font-vercetti)" }}>
												{artifact.eyebrow}
											</p>
											<p
												className="mt-3 text-2xl leading-tight text-[#f8f3e8]"
												style={{ fontFamily: "var(--font-soria)" }}>
												{artifact.title}
											</p>

											{artifact.src ? (
												<div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[0.35rem] border-[3px] border-black bg-[#efe7d6]">
													<Image
														src={artifact.src}
														alt={artifact.alt ?? artifact.title}
														fill
														sizes="(max-width: 1279px) 100vw, 30vw"
														className="object-cover"
													/>
												</div>
											) : null}

											<p
												className="mt-4 text-sm leading-7 text-[#f1eadc]"
												style={{ fontFamily: "var(--font-vercetti)" }}>
												{artifact.description}
											</p>

											{artifact.sourceHref ? (
												<a
													href={artifact.sourceHref}
													className="mt-4 inline-flex border-[3px] border-black bg-[#ffd23c] px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-1"
													style={{ fontFamily: "var(--font-vercetti)" }}>
													{artifact.sourceLabel ?? "View Source"}
												</a>
											) : null}

											{artifact.highlights?.length ? (
												<ul
													className="mt-4 space-y-3 text-sm leading-7 text-[#f1eadc]"
													style={{ fontFamily: "var(--font-vercetti)" }}>
													{artifact.highlights.map((highlight) => (
														<li
															key={highlight}
															className="border-t-[3px] border-white/10 pt-3 first:border-t-0 first:pt-0">
															{highlight}
														</li>
													))}
												</ul>
											) : null}
										</article>
									))}
								</div>
							) : null}

							<div className="flex flex-col gap-4">
								{numberedSections.map((section) => (
									<article
										key={section.title}
										className="neo-panel bg-[#efe7d6] p-5 text-black md:p-6">
										<p
											className="mb-4 text-xs uppercase tracking-[0.28em] text-black/65"
											style={{ fontFamily: "var(--font-vercetti)" }}>
											{section.title}
										</p>
										<ul
											className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px]"
											style={{ fontFamily: "var(--font-vercetti)" }}>
											{section.bullets.map((bullet) => (
												<li
													key={bullet}
													className="border-t-[3px] border-black/15 pt-3 first:border-t-0 first:pt-0">
													<FigureReferenceText text={bullet} refs={dossierFigureReferences} />
												</li>
											))}
										</ul>

										{section.callouts?.length ? (
											<div className="mt-6 border-[3px] border-black bg-[#171a22] p-4 text-[#f8f3e8]">
												<p
													className="text-[11px] uppercase tracking-[0.24em] text-[#31d7c4]"
													style={{ fontFamily: "var(--font-vercetti)" }}>
													{section.calloutTitle ?? "Callouts"}
												</p>
												<ul
													className="mt-3 space-y-3 text-sm leading-7 text-[#f1eadc]"
													style={{ fontFamily: "var(--font-vercetti)" }}>
													{section.callouts.map((callout) => (
														<li
															key={callout}
															className="border-t-[3px] border-white/10 pt-3 first:border-t-0 first:pt-0">
															{callout}
														</li>
													))}
												</ul>
											</div>
										) : null}

										{section.figures?.length ? (
											<div className="mt-6 grid gap-4 xl:grid-cols-2">
												{section.figures.map((figure) => (
													<figure
														key={`${figure.src}-${figure.caption}`}
														id={
															"refKey" in figure
																? getFigureAnchorId(figureScopeKey, figure.refKey)
																: undefined
														}
														className={["space-y-3", figure.figureClassName].filter(Boolean).join(" ")}>
														{"label" in figure ? (
															<p
																className="inline-flex border-[3px] border-black bg-[#ffd23c] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-black"
																style={{ fontFamily: "var(--font-vercetti)" }}>
																{figure.label}
															</p>
														) : null}
														<div
															className={[
																"relative aspect-[16/10] overflow-hidden border-[3px] border-black bg-[#171a22]",
																figure.frameClassName,
															]
																.filter(Boolean)
																.join(" ")}>
															{figure.kind === "video" ? (
																<video
																	controls
																	playsInline
																	preload="metadata"
																	poster={figure.posterSrc}
																	aria-label={figure.alt}
																	className="h-full w-full object-cover">
																	<source src={figure.src} type="video/mp4" />
																	Your browser does not support the video tag.
																</video>
															) : (
																<Image
																	src={figure.src}
																	alt={figure.alt}
																	fill
																	sizes={figure.sizes ?? "(max-width: 1279px) 100vw, 40vw"}
																	className={figure.imageClassName ?? "object-cover"}
																/>
															)}
														</div>
														<figcaption
															className="text-xs leading-6 text-black/70"
															style={{ fontFamily: "var(--font-vercetti)" }}>
															<FigureReferenceText text={figure.caption} refs={dossierFigureReferences} />
														</figcaption>
													</figure>
												))}
											</div>
										) : null}
									</article>
								))}
							</div>
						</section>
					);
				})}

				<section className="flex flex-col gap-6 py-10 md:py-14">
					{ctmf.evidence.length ? (
						<div className="neo-panel bg-[#efe7d6] p-6 text-black md:p-8">
						<p
							className="mb-5 text-sm uppercase tracking-[0.28em] text-black/70"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							Evidence Across Projects
						</p>
						<ul
							className="space-y-4 text-base leading-8 text-black/80"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							{ctmf.evidence.map((item) => (
								<li
									key={item}
									className="border-b-[3px] border-black/15 pb-4 last:border-b-0 last:pb-0">
									{item}
								</li>
							))}
						</ul>
						</div>
					) : null}

					<article className="neo-panel bg-[#171a22] p-6 text-[#f8f3e8] md:p-8">
						<p
							className="mb-3 text-sm uppercase tracking-[0.28em] text-[#31d7c4]"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							How I Use It
						</p>
						<p
							className="text-base leading-8 text-[#f1eadc]"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							{ctmf.application}
						</p>
					</article>
				</section>

				<section className="neo-panel mt-auto bg-[#171a22] p-6 text-[#f8f3e8] md:p-8">
					<p
						className="mb-5 text-sm uppercase tracking-[0.28em] text-[#ffd23c]"
						style={{ fontFamily: "var(--font-vercetti)" }}>
						Referenced By Projects
					</p>
					<div className="flex flex-col gap-4">
						{relatedProjects.map((project) => (
							<RememberedLink
								key={project.slug}
								href={`/projects/${project.slug}`}
								returnHref={`/ctmfs/${slug}`}
								returnLabel="Back to CTMF"
								className="neo-panel bg-[#efe7d6] p-5 text-black transition-transform hover:-translate-y-1">
								<p
									className="text-xs uppercase tracking-[0.24em] text-black/60"
									style={{ fontFamily: "var(--font-vercetti)" }}>
									{project.course} - {project.year}
								</p>
								<p
									className="mt-3 text-2xl text-black"
									style={{ fontFamily: "var(--font-soria)" }}>
									{project.title}
								</p>
								<p
									className="mt-3 text-sm leading-7 text-black/78"
									style={{ fontFamily: "var(--font-vercetti)" }}>
									{project.overview}
								</p>
							</RememberedLink>
						))}
					</div>
				</section>

				<ReferencesSection className="mt-6" />
			</div>
		</main>
	);
};

export default CtmfPage;

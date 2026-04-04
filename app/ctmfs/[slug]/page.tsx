import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HidePortalCloseButton from "@/app/components/common/HidePortalCloseButton";
import RememberedBackLink from "@/app/components/common/RememberedBackLink";
import RememberedLink from "@/app/components/common/RememberedLink";
import { PROJECTS, PROJECT_DETAILS, WORK_TIMELINE } from "@constants";

type CtmfPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

const getCtmfData = (slug: string) => {
	const ctmf = PROJECTS.find((entry) => entry.slug === slug);

	if (!ctmf) {
		return null;
	}

	const relatedProjects = WORK_TIMELINE
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

const CtmfPage = async ({ params }: CtmfPageProps) => {
	const { slug } = await params;
	const data = getCtmfData(slug);

	if (!data) {
		notFound();
	}

	const { ctmf, relatedProjects } = data;

	return (
		<main className="ctmf-brutalist relative min-h-screen overflow-hidden text-[#f8f3e8]">
			<HidePortalCloseButton />
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40" />
			</div>

			<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 md:px-10 md:py-12">
				<div className="mb-10 flex items-center justify-between gap-4 border-b-[3px] border-black pb-6">
					<RememberedBackLink fallbackHref="/?portal=projects" fallbackLabel="Back to CTMFs" />
					<p
						className="neo-chip -rotate-2 bg-[#ffd23c] px-3 py-2 text-right text-xs uppercase tracking-[0.32em] text-black"
						style={{ fontFamily: "var(--font-vercetti)" }}>
						CTMF Dossier
					</p>
				</div>

				<section className="flex flex-col gap-6 border-b-[3px] border-black pb-10 md:pb-14">
					<div>
						<p
							className="mb-4 inline-block border-[3px] border-black bg-[#31d7c4] px-3 py-2 text-sm uppercase tracking-[0.34em] text-black"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							{ctmf.stageCode ? `[${ctmf.stageCode}] ${ctmf.stage}` : ctmf.stage}
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

				{ctmf.dossiers?.map((dossier) => (
					<section
						key={`${ctmf.slug}-${dossier.project}`}
						className="flex flex-col gap-6 border-b-[3px] border-black py-10 md:py-14">
						<aside className="neo-panel neo-angle bg-[#171a22] p-6 text-[#f8f3e8] md:p-8">
							<p
								className="text-xs uppercase tracking-[0.3em] text-[#ffd23c]"
								style={{ fontFamily: "var(--font-vercetti)" }}>
								{dossier.project} Planning Dossier
							</p>
							<div className="mt-4 flex items-center gap-3">
								<span
									className="neo-chip bg-[#ffd23c] px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-black"
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
								{dossier.summary}
							</p>
						</aside>

						<div className="flex flex-col gap-4">
							{dossier.sections.map((section) => (
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
											<li key={bullet} className="border-t-[3px] border-black/15 pt-3 first:border-t-0 first:pt-0">
												{bullet}
											</li>
										))}
									</ul>
								</article>
							))}
						</div>
					</section>
				))}

				<section className="flex flex-col gap-6 py-10 md:py-14">
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
								<li key={item} className="border-b-[3px] border-black/15 pb-4 last:border-b-0 last:pb-0">
									{item}
								</li>
							))}
						</ul>
					</div>

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
									{project.course} · {project.year}
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
			</div>
		</main>
	);
};

export default CtmfPage;

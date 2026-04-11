import Image from "next/image";

import { PROJECT_DETAILS, PROJECTS } from "@/app/constants";
import { REFERENCE_LIBRARY } from "@/app/constants/references";
import { formatIeeeReference } from "@/app/lib/references";

const portfolioUrl = "https://williamxu070.github.io/Student-Engineer-Design-Portfolio/";

const primaryProjects = [
	{
		slug: "praxis-i",
		label: "Praxis I",
		route: "/projects/praxis-i",
	},
	{
		slug: "civ102-bridge",
		label: "CIV102 Bridge",
		route: "/projects/civ102-bridge",
	},
	{
		slug: "praxis-ii",
		label: "Praxis II",
		route: "/projects/praxis-ii",
	},
] as const;

const screenshots = [
	{
		src: "/submission-screenshots/home.png",
		alt: "Portfolio landing page screenshot.",
		caption: "Landing page showing the portfolio entry experience.",
	},
	{
		src: "/submission-screenshots/project-cards.png",
		alt: "Portfolio project cards screenshot.",
		caption: "Project navigation showing the primary design activities.",
	},
	{
		src: "/submission-screenshots/position-scroll.png",
		alt: "Portfolio scrolled page screenshot.",
		caption: "Scrolling website view showing the portfolio presentation as a designed artifact.",
	},
	{
		src: "/submission-screenshots/ctmf-view.png",
		alt: "Portfolio CTMF view screenshot.",
		caption: "CTMF / process-oriented view used to connect design tools to project evidence.",
	},
];

const referenceEntries = Object.entries(REFERENCE_LIBRARY);

const SubmissionPage = () => {
	return (
		<main className="min-h-screen bg-[#f5f0e5] px-6 py-10 text-[#141414] md:px-12 lg:px-20">
			<section className="mx-auto max-w-5xl border-[3px] border-black bg-[#fffaf0] p-7 shadow-[12px_12px_0_#000] md:p-10">
				<p
					className="text-[0.72rem] uppercase tracking-[0.32em] text-black/60"
					style={{ fontFamily: "var(--font-vercetti)" }}>
					ESC102 Design Portfolio Submission
				</p>
				<h1
					className="mt-4 text-5xl leading-[0.95] md:text-7xl"
					style={{ fontFamily: "var(--font-soria)" }}>
					Student Engineer Design Portfolio
				</h1>
				<p
					className="mt-5 max-w-3xl text-base leading-7 text-black/72"
					style={{ fontFamily: "var(--font-vercetti)" }}>
					This PDF is the submission wrapper for the website portfolio. The portfolio itself contains the designed
					interface, project one-page summaries, project annotations, CTMF dossiers, teammate credit, and evidence
					figures. The bibliography at the end of this document uses IEEE-style entries.
				</p>

				<div className="mt-8 rounded-[1.2rem] border-2 border-black bg-[#ffe86b] p-5">
					<p
						className="text-[0.68rem] uppercase tracking-[0.25em] text-black/60"
						style={{ fontFamily: "var(--font-vercetti)" }}>
						Website URL
					</p>
					<a
						href={portfolioUrl}
						className="mt-2 block break-all text-lg font-semibold underline decoration-[2px] underline-offset-4"
						style={{ fontFamily: "var(--font-vercetti)" }}>
						{portfolioUrl}
					</a>
				</div>
			</section>

			<section className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
				{primaryProjects.map((project) => {
					const detail = PROJECT_DETAILS[project.slug];
					const ctmfs = PROJECTS.filter((ctmf) => detail.ctmfRefs.includes(ctmf.slug));

					return (
						<article
							key={project.slug}
							className="break-inside-avoid rounded-[1.2rem] border-2 border-black bg-white p-5 shadow-[7px_7px_0_#000]">
							<p
								className="text-[0.68rem] uppercase tracking-[0.24em] text-black/55"
								style={{ fontFamily: "var(--font-vercetti)" }}>
								{detail.course}
							</p>
							<h2
								className="mt-3 text-3xl leading-none"
								style={{ fontFamily: "var(--font-soria)" }}>
								{detail.title}
							</h2>
							<p
								className="mt-4 text-sm leading-6 text-black/74"
								style={{ fontFamily: "var(--font-vercetti)" }}>
								{detail.overview}
							</p>
							<p
								className="mt-5 text-[0.68rem] uppercase tracking-[0.22em] text-black/55"
								style={{ fontFamily: "var(--font-vercetti)" }}>
								CTMFs
							</p>
							<ul className="mt-3 space-y-2 text-sm leading-6" style={{ fontFamily: "var(--font-vercetti)" }}>
								{ctmfs.map((ctmf) => (
									<li key={ctmf.slug}>
										<span className="font-semibold">{ctmf.title}</span>
										<span className="text-black/55"> - {ctmf.stageCode ? `[${ctmf.stageCode}] ` : ""}{ctmf.stage}</span>
									</li>
								))}
							</ul>
							<a
								href={`${portfolioUrl}${project.route.replace(/^\//, "")}`}
								className="mt-5 block break-all text-xs underline underline-offset-4"
								style={{ fontFamily: "var(--font-vercetti)" }}>
								{`${portfolioUrl}${project.route.replace(/^\//, "")}`}
							</a>
						</article>
					);
				})}
			</section>

			<section className="mx-auto mt-12 max-w-5xl">
				<h2 className="text-4xl" style={{ fontFamily: "var(--font-soria)" }}>
					Website Screenshots
				</h2>
				<div className="mt-6 grid gap-7">
					{screenshots.map((screenshot) => (
						<figure
							key={screenshot.src}
							className="break-inside-avoid rounded-[1.2rem] border-2 border-black bg-white p-4 shadow-[8px_8px_0_#000]">
							<div className="relative aspect-[16/9] overflow-hidden rounded-[0.75rem] border border-black/20 bg-black">
								<Image
									src={screenshot.src}
									alt={screenshot.alt}
									fill
									sizes="(max-width: 1024px) 100vw, 60rem"
									className="object-contain"
								/>
							</div>
							<figcaption
								className="mt-3 text-sm leading-6 text-black/70"
								style={{ fontFamily: "var(--font-vercetti)" }}>
								{screenshot.caption}
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			<section className="mx-auto mt-14 max-w-5xl break-before-page">
				<p
					className="text-[0.72rem] uppercase tracking-[0.32em] text-black/60"
					style={{ fontFamily: "var(--font-vercetti)" }}>
					References
				</p>
				<h2 className="mt-3 text-5xl" style={{ fontFamily: "var(--font-soria)" }}>
					Bibliography
				</h2>
				<ol className="mt-7 space-y-4">
					{referenceEntries.map(([id, reference], index) => (
						<li
							key={id}
							className="break-inside-avoid rounded-[0.9rem] border border-black/15 bg-white/75 px-4 py-3 text-sm leading-7 text-black/78"
							style={{ fontFamily: "var(--font-vercetti)" }}>
							{formatIeeeReference(reference, index + 1)}
						</li>
					))}
				</ol>
			</section>
		</main>
	);
};

export default SubmissionPage;

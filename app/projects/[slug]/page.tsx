import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HidePortalCloseButton from "@/app/components/common/HidePortalCloseButton";
import RememberedBackLink from "@/app/components/common/RememberedBackLink";
import RememberedLink from "@/app/components/common/RememberedLink";
import { PROJECT_DETAILS, PROJECTS, WORK_TIMELINE } from "@constants";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getProjectPageData = (slug: string) => {
  const timelinePoint = WORK_TIMELINE.find((point) => point.slug === slug);
  const detail = PROJECT_DETAILS[slug];

  if (!timelinePoint || !detail) {
    return null;
  }

  return { timelinePoint, detail };
};

export const generateStaticParams = () => {
  return WORK_TIMELINE.map((point) => ({
    slug: point.slug,
  }));
};

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const data = getProjectPageData(slug);

  if (!data) {
    return {
      title: "Project Not Found | William",
    };
  }

  return {
    title: `${data.detail.title} | William`,
    description: data.detail.overview,
  };
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const data = getProjectPageData(slug);

  if (!data) {
    notFound();
  }

  const { detail, timelinePoint } = data;
  const relatedCtmfs = PROJECTS.filter((ctmf) => detail.ctmfRefs.includes(ctmf.slug)).slice(0, 4);
  const processSteps = [
    {
      id: "01",
      title: "Stakeholders & Brief Refinement",
      body: detail.process.refinement,
    },
    {
      id: "02",
      title: "Generation of Solutions",
      body: detail.process.generation,
    },
    {
      id: "03",
      title: "Assessment",
      body: detail.process.assessment,
    },
  ];

  return (
    <main className="project-sky-shell relative min-h-screen overflow-hidden text-slate-950">
      <HidePortalCloseButton />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="project-sky-haze project-sky-haze-a" />
        <div className="project-sky-haze project-sky-haze-b" />
        <div className="project-sky-haze project-sky-haze-c" />
        <div className="project-cloud project-cloud-a" />
        <div className="project-cloud project-cloud-b" />
        <div className="project-grid-glow" />
        <div className="project-horizon-line" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-5 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/20 pb-6 md:mb-10">
          <RememberedBackLink fallbackHref="/?portal=work" fallbackLabel="Back to Timeline" />
          <div className="rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-slate-900/60 md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(24rem,0.9fr)]">
          <div className="project-glass-panel project-glass-hero relative overflow-hidden rounded-[2.25rem] p-6 md:p-8 xl:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(113,184,255,0.2),transparent_34%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div className="max-w-4xl">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full border border-white/35 bg-white/16 px-4 py-2 text-[0.68rem] uppercase tracking-[0.32em] text-slate-900/68 backdrop-blur-xl"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {detail.course}
                  </span>
                  <span
                    className="rounded-full border border-sky-900/10 bg-sky-100/18 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/50"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    In the Sky Archive
                  </span>
                </div>

                <h1
                  className="max-w-5xl text-[2.9rem] leading-[0.96] text-slate-950 md:text-[4.8rem] xl:text-[6rem]"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  {detail.title}
                </h1>

                <p
                  className="mt-6 max-w-3xl text-base leading-8 text-slate-900/72 md:text-[1.08rem] md:leading-8"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {detail.overview}
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
                <div className="project-media-stage rounded-[1.8rem] p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/52"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      Hero Media Deck
                    </p>
                    <span
                      className="rounded-full border border-white/40 bg-white/18 px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-slate-900/56"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      Future-ready
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-[1.4fr_0.8fr]">
                    <div className="project-media-card min-h-[16rem] rounded-[1.5rem] p-5 md:min-h-[18rem]">
                      <div className="project-media-sheen" />
                      <p
                        className="relative z-10 text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/46"
                        style={{ fontFamily: "var(--font-vercetti)" }}>
                        Primary Surface
                      </p>
                      <div className="relative z-10 mt-10">
                        <p
                          className="text-2xl leading-tight text-slate-950 md:text-[2rem]"
                          style={{ fontFamily: "var(--font-soria)" }}>
                          Space for future hero visuals, prototypes, renders, or video stills.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="project-media-card min-h-[8rem] rounded-[1.4rem] p-4">
                        <p
                          className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-900/44"
                          style={{ fontFamily: "var(--font-vercetti)" }}>
                          Detail Reel
                        </p>
                      </div>
                      <div className="project-media-card min-h-[8rem] rounded-[1.4rem] p-4">
                        <p
                          className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-900/44"
                          style={{ fontFamily: "var(--font-vercetti)" }}>
                          Caption Layer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="project-glass-panel rounded-[1.8rem] p-5">
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      Timeline Position
                    </p>
                    <p
                      className="mt-3 text-3xl leading-tight text-slate-950"
                      style={{ fontFamily: "var(--font-soria)" }}>
                      {timelinePoint.title}
                    </p>
                    <p
                      className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-900/48"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {timelinePoint.subtitle}
                    </p>
                  </div>

                  <div className="project-glass-panel rounded-[1.8rem] p-5">
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      Design Focus
                    </p>
                    <ul
                      className="mt-4 space-y-3"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {detail.criteria.slice(0, 3).map((criterion, index) => (
                        <li
                          key={criterion}
                          className="rounded-[1.1rem] border border-white/25 bg-white/16 px-4 py-3 text-sm leading-6 text-slate-900/70 backdrop-blur-xl">
                          <span className="mr-3 text-slate-900/36">0{index + 1}</span>
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="flex h-full flex-col gap-6">
            <div className="project-glass-panel rounded-[2rem] p-6 md:p-7">
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Related CTMFs
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {relatedCtmfs.map((ctmf, index) => (
                  <RememberedLink
                    key={ctmf.slug}
                    href={`/ctmfs/${ctmf.slug}`}
                    returnHref={`/projects/${slug}`}
                    returnLabel="Back to Project"
                    className="project-chip inline-flex rounded-full px-4 py-3 text-[0.72rem] uppercase tracking-[0.24em] text-slate-900/72 transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      fontFamily: "var(--font-vercetti)",
                      animationDelay: `${index * 160}ms`,
                    }}>
                    {ctmf.title}
                  </RememberedLink>
                ))}
              </div>
            </div>

            <div className="project-glass-panel rounded-[2rem] p-6 md:p-7">
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Flight Notes
              </p>
              <p
                className="mt-4 text-2xl leading-tight text-slate-950"
                style={{ fontFamily: "var(--font-soria)" }}>
                A mature glass system tuned for archival storytelling, future media, and technical depth.
              </p>
              <p
                className="mt-4 text-sm leading-7 text-slate-900/66"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                This page is intentionally structured like a viewing deck. It gives the project atmosphere now,
                while leaving room for future photos, videos, diagrams, and richer hero content without collapsing
                into a generic case-study template.
              </p>
            </div>

            <div className="project-glass-panel rounded-[2rem] p-6 md:p-7">
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Expandable Content Zones
              </p>
              <div className="mt-5 grid gap-3">
                {["Photo strip", "Embedded prototype or video", "Header narrative block"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.15rem] border border-dashed border-white/28 bg-white/10 px-4 py-4 text-sm uppercase tracking-[0.2em] text-slate-900/50"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]">
          <div className="project-glass-panel rounded-[2rem] p-6 md:p-8">
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Design Pressure
            </p>

            <ul
              className="mt-6 space-y-4"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.criteria.map((criterion, index) => (
                <li
                  key={criterion}
                  className="rounded-[1.35rem] border border-white/24 bg-white/14 px-4 py-4 text-base leading-7 text-slate-900/72 backdrop-blur-xl">
                  <span className="mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-slate-900/34">
                    Constraint {index + 1}
                  </span>
                  {criterion}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="project-glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    Process Flight Path
                  </p>
                  <h2
                    className="mt-3 text-3xl leading-tight text-slate-950 md:text-[2.8rem]"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    Less template, more atmosphere and sequence.
                  </h2>
                </div>
                <p
                  className="max-w-md text-sm leading-7 text-slate-900/62"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Each phase now reads as part of one guided ascent instead of three identical content blocks.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <article
                  key={step.id}
                  className="project-glass-panel project-step-card rounded-[1.8rem] p-6 md:p-7"
                  style={{ animationDelay: `${index * 120}ms` }}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p
                        className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/44"
                        style={{ fontFamily: "var(--font-vercetti)" }}>
                        {step.id}
                      </p>
                      <h3
                        className="mt-3 text-2xl leading-tight text-slate-950 md:text-[2.1rem]"
                        style={{ fontFamily: "var(--font-soria)" }}>
                        {step.title}
                      </h3>
                    </div>
                    <div className="project-step-line hidden md:block" />
                  </div>
                  <p
                    className="mt-5 max-w-4xl text-base leading-8 text-slate-900/72"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <div className="project-glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_62%)]" />
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Reflection
            </p>
            <blockquote
              className="relative z-10 mt-5 max-w-4xl text-[1.55rem] leading-[1.45] text-slate-950/88 md:text-[2.45rem] md:leading-[1.3]"
              style={{ fontFamily: "var(--font-soria)" }}>
              {detail.process.reflection}
            </blockquote>
          </div>

          <div className="project-glass-panel rounded-[2rem] p-6 md:p-7">
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-900/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Surface System
            </p>
            <div className="mt-5 grid gap-3">
              {[
                "Liquid glass cards with deeper blur and restrained contrast",
                "Animated atmospheric light instead of generic gradient blobs",
                "Section rhythm designed for future media and long-form case study content",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-white/25 bg-white/16 px-4 py-4 text-sm leading-7 text-slate-900/66"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectPage;

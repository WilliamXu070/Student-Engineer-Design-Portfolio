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
  const relatedCtmfs = PROJECTS.filter((ctmf) => detail.ctmfRefs.includes(ctmf.slug)).slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#e9f7ff_0%,#d7edff_20%,#a8cceb_50%,#668ab1_100%)] text-slate-950">
      <HidePortalCloseButton />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[8%] h-48 w-80 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute right-[10%] top-[16%] h-56 w-56 rounded-full bg-white/42 blur-3xl" />
        <div className="absolute left-[16%] bottom-[18%] h-56 w-64 rounded-full bg-sky-100/32 blur-3xl" />
        <div className="absolute right-[18%] bottom-[10%] h-40 w-72 rounded-full bg-blue-100/28 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:px-10 md:py-12">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-slate-900/10 pb-6">
          <RememberedBackLink fallbackHref="/?portal=work" fallbackLabel="Back to Timeline" />
          <p
            className="text-right text-xs uppercase tracking-[0.28em] text-slate-800/50"
            style={{ fontFamily: "var(--font-vercetti)" }}>
            {timelinePoint.year}
          </p>
        </div>

        <section className="grid gap-8 border-b border-slate-900/10 pb-10 md:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)] md:gap-12 md:pb-14">
          <div>
            <p
              className="mb-4 text-sm uppercase tracking-[0.3em] text-sky-900/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.course}
            </p>
            <h1
              className="max-w-4xl text-4xl leading-tight md:text-6xl"
              style={{ fontFamily: "var(--font-soria)" }}>
              {detail.title}
            </h1>
            <p
              className="mt-6 max-w-3xl text-base leading-8 text-slate-900/74 md:text-lg"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.overview}
            </p>
          </div>

          <aside className="rounded-[2rem] border border-white/55 bg-white/28 p-6 shadow-[0_18px_60px_rgba(83,110,143,0.18)] backdrop-blur-2xl">
            <p
              className="text-xs uppercase tracking-[0.28em] text-slate-800/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Timeline Position
            </p>
            <p
              className="mt-3 text-2xl text-slate-950"
              style={{ fontFamily: "var(--font-soria)" }}>
              {timelinePoint.title}
            </p>
            <p
              className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-800/58"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.subtitle}
            </p>

            <div className="mt-8 h-px w-full bg-slate-900/10" />

            <p
              className="mt-8 text-xs uppercase tracking-[0.28em] text-slate-800/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Focus
            </p>
            <ul
              className="mt-4 list-none space-y-3 pl-0 text-sm leading-7 text-slate-900/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.criteria.slice(0, 3).map((criterion) => (
                <li key={criterion} className="border-l border-sky-900/28 pl-4">
                  {criterion}
                </li>
              ))}
            </ul>

            <div className="mt-8 h-px w-full bg-slate-900/10" />

            <p
              className="mt-8 text-xs uppercase tracking-[0.28em] text-slate-800/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              CTMF References
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedCtmfs.map((ctmf) => (
                <RememberedLink
                  key={ctmf.slug}
                  href={`/ctmfs/${ctmf.slug}`}
                  returnHref={`/projects/${slug}`}
                  returnLabel="Back to Project"
                  className="rounded-full border border-white/60 bg-white/18 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-900/78 transition-colors hover:border-white hover:bg-white/32"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {ctmf.title}
                </RememberedLink>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-8 py-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:py-14">
          <div className="rounded-[2rem] border border-white/55 bg-white/24 p-6 backdrop-blur-2xl md:p-8">
            <p
              className="mb-5 text-sm uppercase tracking-[0.28em] text-sky-900/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Criteria & Constraints
            </p>
            <ul
              className="list-none space-y-4 pl-0 text-base leading-8 text-slate-900/76"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.criteria.map((criterion) => (
                <li key={criterion} className="border-b border-slate-900/8 pb-4 last:border-b-0 last:pb-0">
                  {criterion}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-white/55 bg-white/24 p-6 backdrop-blur-2xl md:p-8">
              <p
                className="mb-3 text-sm uppercase tracking-[0.28em] text-sky-900/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                01. Stakeholders & Brief Refinement
              </p>
              <p
                className="text-base leading-8 text-slate-900/76"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {detail.process.refinement}
              </p>
            </article>

            <article className="rounded-[2rem] border border-white/55 bg-white/24 p-6 backdrop-blur-2xl md:p-8">
              <p
                className="mb-3 text-sm uppercase tracking-[0.28em] text-sky-900/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                02. Generation of Solutions
              </p>
              <p
                className="text-base leading-8 text-slate-900/76"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {detail.process.generation}
              </p>
            </article>

            <article className="rounded-[2rem] border border-white/55 bg-white/24 p-6 backdrop-blur-2xl md:p-8">
              <p
                className="mb-3 text-sm uppercase tracking-[0.28em] text-sky-900/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                03. Assessment
              </p>
              <p
                className="text-base leading-8 text-slate-900/76"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {detail.process.assessment}
              </p>
            </article>
          </div>
        </section>

        <section className="mt-auto rounded-[2rem] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.18))] p-6 backdrop-blur-2xl md:p-8">
          <p
            className="mb-4 text-sm uppercase tracking-[0.28em] text-sky-900/70"
            style={{ fontFamily: "var(--font-vercetti)" }}>
            Reflection
          </p>
          <blockquote
            className="max-w-4xl text-xl leading-9 text-slate-950/88 md:text-2xl md:leading-10"
            style={{ fontFamily: "var(--font-soria)" }}>
            {detail.process.reflection}
          </blockquote>
        </section>
      </div>
    </main>
  );
};

export default ProjectPage;

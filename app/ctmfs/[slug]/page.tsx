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
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#eff8ff_0%,#daefff_18%,#a6cbe9_50%,#6287ad_100%)] text-slate-950">
      <HidePortalCloseButton />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[10%] h-52 w-80 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute right-[8%] top-[16%] h-44 w-64 rounded-full bg-white/45 blur-3xl" />
        <div className="absolute left-[22%] top-[34%] h-36 w-56 rounded-full bg-sky-100/36 blur-3xl" />
        <div className="absolute right-[18%] bottom-[16%] h-56 w-56 rounded-full bg-blue-100/28 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:px-10 md:py-12">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-slate-900/10 pb-6">
          <RememberedBackLink fallbackHref="/?portal=projects" fallbackLabel="Back to CTMFs" />
          <p
            className="text-right text-xs uppercase tracking-[0.28em] text-sky-900/70"
            style={{ fontFamily: "var(--font-vercetti)" }}>
            CTMF Dossier
          </p>
        </div>

        <section className="grid gap-8 border-b border-slate-900/10 pb-10 md:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.85fr)] md:gap-12 md:pb-14">
          <div>
            <p
              className="mb-4 text-sm uppercase tracking-[0.3em] text-sky-900/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {ctmf.stage}
            </p>
            <h1
              className="max-w-4xl text-4xl leading-tight md:text-6xl"
              style={{ fontFamily: "var(--font-soria)" }}>
              {ctmf.title}
            </h1>
            <p
              className="mt-6 max-w-3xl text-base leading-8 text-slate-900/74 md:text-lg"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {ctmf.overview}
            </p>
          </div>

          <aside className="rounded-[2rem] border border-white/55 bg-white/28 p-6 shadow-[0_18px_60px_rgba(83,110,143,0.18)] backdrop-blur-2xl">
            <p
              className="text-xs uppercase tracking-[0.28em] text-slate-800/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Portfolio Role
            </p>
            <p
              className="mt-3 text-2xl text-slate-950"
              style={{ fontFamily: "var(--font-soria)" }}>
              {ctmf.subtext}
            </p>
            <div className="mt-8 h-px w-full bg-slate-900/10" />
            <p
              className="mt-8 text-xs uppercase tracking-[0.28em] text-slate-800/48"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Why It Matters
            </p>
            <p
              className="mt-4 text-sm leading-7 text-slate-900/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {ctmf.whyItMatters}
            </p>
          </aside>
        </section>

        <section className="grid gap-8 py-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:py-14">
          <div className="rounded-[2rem] border border-white/55 bg-white/24 p-6 backdrop-blur-2xl md:p-8">
            <p
              className="mb-5 text-sm uppercase tracking-[0.28em] text-sky-900/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Evidence Across Projects
            </p>
            <ul
              className="space-y-4 text-base leading-8 text-slate-900/76"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {ctmf.evidence.map((item) => (
                <li key={item} className="border-b border-slate-900/8 pb-4 last:border-b-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <article className="rounded-[2rem] border border-white/55 bg-white/24 p-6 backdrop-blur-2xl md:p-8">
            <p
              className="mb-3 text-sm uppercase tracking-[0.28em] text-sky-900/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              How I Use It
            </p>
            <p
              className="text-base leading-8 text-slate-900/76"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {ctmf.application}
            </p>
          </article>
        </section>

        <section className="mt-auto rounded-[2rem] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.18))] p-6 backdrop-blur-2xl md:p-8">
          <p
            className="mb-5 text-sm uppercase tracking-[0.28em] text-sky-900/70"
            style={{ fontFamily: "var(--font-vercetti)" }}>
            Referenced By Projects
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <RememberedLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                returnHref={`/ctmfs/${slug}`}
                returnLabel="Back to CTMF"
                className="rounded-[1.5rem] border border-white/55 bg-white/24 p-5 backdrop-blur-2xl transition-colors hover:border-white hover:bg-white/34">
                <p
                  className="text-xs uppercase tracking-[0.24em] text-slate-800/50"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {project.course} · {project.year}
                </p>
                <p
                  className="mt-3 text-2xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  {project.title}
                </p>
                <p
                  className="mt-3 text-sm leading-7 text-slate-900/70"
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

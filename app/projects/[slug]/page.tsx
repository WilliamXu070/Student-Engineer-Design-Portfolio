import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
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

const selectableTextStyle: CSSProperties = {
  WebkitUserSelect: "text",
  MozUserSelect: "text",
  msUserSelect: "text",
  userSelect: "text",
};

const darkPanelClass =
  "neo-panel rounded-[0.35rem] border-[3px] border-black bg-[#171a22] text-[#f8f3e8] shadow-[10px_10px_0_#000]";
const lightPanelClass =
  "neo-panel rounded-[0.35rem] border-[3px] border-black bg-[#efe7d6] text-black shadow-[10px_10px_0_#000]";

const praxisIStakeholders = [
  {
    title: "Students and educators",
    body: "Needed a solution that meaningfully reduced a disruptive 100 to 120 dB opening impulse in lecture halls, libraries, and other quiet academic spaces.",
  },
  {
    title: "Users with reduced strength or dexterity",
    body: "Pushed the design toward low hand pressure, low force, and minimal gestures instead of a solution that only worked for able-bodied users.",
  },
  {
    title: "Manufacturers and regulators",
    body: "Introduced pressure for compactness, hygiene, food-safe interaction, and conceptual compatibility with standard can geometry and use patterns.",
  },
];

const praxisIRequirements = [
  "Strong peak-noise reduction during opening",
  "Minimal liquid loss and controlled CO2 boil-off",
  "Portable form factor suitable for everyday carry",
  "Accessible interaction with low force and low hand pressure",
  "Safe, clean contact around the drinking surface",
];

const praxisIClaims = [
  "Good engineering depends on framing, not just solving.",
  "When evidence breaks the logic of a design, I would rather reopen the problem than protect the original idea.",
  "My drive for rigor helped me notice weak logic, but it also made it harder to tolerate continued work inside an unstable frame.",
];

const praxisIMetrics = [
  {
    metric: "Peak noise",
    slider: "61 dB",
    comparison: "Control can: 102 dB",
    note: "41 dB reduction in the opening impulse.",
  },
  {
    metric: "Liquid loss",
    slider: "0.46%",
    comparison: "Control can: 0.70%",
    note: "Quiet opening did not come at the cost of greater spilling.",
  },
  {
    metric: "CO2 boil-off over 90 s",
    slider: "0.4 g",
    comparison: "Control: 1.3 g · Rubber tab: 1.2 g",
    note: "The slider preserved beverage integrity best across the tested concepts.",
  },
  {
    metric: "Maximum hand pressure",
    slider: "80 kPa",
    comparison: "Rubber tab: 135 kPa · Water opener: 600 kPa",
    note: "Accessibility improved alongside noise reduction.",
  },
  {
    metric: "Gesture count",
    slider: "2 gestures",
    comparison: "Rubber tab: 3 · Water opener: 5",
    note: "The mechanism stayed compact without becoming cumbersome to use.",
  },
];

const praxisIDecisions = [
  {
    title: "The original frame",
    body:
      "The team began by treating the challenge as finding a quieter way to open a standard can, which naturally led to puncture vents, water damping, and tab attachments. That frame made the problem feel manageable, but it also hid an assumption: that the dominant sound came from fast depressurization alone.",
  },
  {
    title: "The test that broke it",
    body:
      "Vented and unvented openings produced similar dB levels. That suggested the loudest part of the event was not simply escaping gas, but the fracture of the scored aluminum tear strip. The key decision was not what the test measured, but whether the team would treat that result as a detail or as a reason to reopen the frame itself.",
  },
  {
    title: "Why the slider was worth the complexity",
    body:
      "Once the team accepted that the fracture event was central to the noise problem, easier retrofit concepts became less convincing. The slider was selected because it directly removed the abrupt tear-strip event while also performing best against the measured criteria, even though it required a more radical lid redesign.",
  },
];

const praxisISkills = [
  "Testing can expose a framing error, not just validate a solution.",
  "Evidence should sometimes trigger reframing instead of more optimization.",
  "Concept comparison becomes stronger when criteria are explicit and measurable.",
  "Design disagreement often comes from competing framings, not just competing solutions.",
  "Engineering rigor includes questioning assumptions before they harden into constraints.",
];

const praxisITeam = ["Katherine Chen", "Shupeng Liu", "Issac Ng", "William Xu"];

const praxisICtmfLessons: Record<string, string> = {
  "stakeholder-mapping":
    "Turned the NGOs into requirements so the project could not collapse into decibel reduction alone.",
  "morphological-chart":
    "Broadened the mechanism space, but also showed that divergence had to be rebuilt once testing weakened the original depressurization frame.",
  "pugh-chart":
    "Made convergence discussable, but only after the frame and criteria were strong enough that the matrix meant more than neat scoring.",
};

const civ102Claims = [
  "I trust engineering that is controllable and buildable more than engineering that only looks sophisticated.",
  "When options compete, I prioritize structural clarity and constructability over complexity.",
  "CIV102 showed me that a strong model is not enough if local fabrication uncertainty can still govern the real failure.",
];

const civ102Stakeholders = [
  {
    title: "The moving-load test itself",
    body: "The bridge had to survive a prescribed moving 400 N train load, so shear, bending, and buckling had to be controlled across the span rather than at one idealized section.",
  },
  {
    title: "Material and fabrication limits",
    body: "One 813 mm by 1,016 mm sheet of 1.27 mm matboard and two tubes of contact cement meant strength could not be separated from fitting, cutting, and assembly logic.",
  },
  {
    title: "Geometric constraints",
    body: "The bridge had to span 1,200 mm, keep the deck horizontal, maintain at least 100 mm of deck width, and stay below the allowed track height above the supports.",
  },
];

const civ102Requirements = [
  "Carry the required 400 N moving train load across a 1,200 mm span.",
  "Control bending, shear, and buckling within the matboard material limits.",
  "Fit the full bridge onto one sheet without wasting critical material.",
  "Remain manufacturable and structurally credible after cutting, splicing, and assembly.",
];

const civ102Metrics = [
  {
    metric: "Required train load",
    value: "400 N",
    note: "The project only succeeded if the bridge could survive the moving-load test scenario.",
  },
  {
    metric: "Design 0 predicted failure",
    value: "260 N",
    note: "The baseline design was well below target and controlled by thin-plate buckling case 1.",
  },
  {
    metric: "Design 1 predicted failure",
    value: "668 N",
    note: "Doubling the top flange improved compression resistance enough to exceed the required load case.",
  },
  {
    metric: "Peak analytical iteration",
    value: "2.12 kN",
    note: "The evenly spaced diaphragm variant was very strong on paper, but could not fit or be built reliably.",
  },
  {
    metric: "Final predicted failure",
    value: "1.367 kN",
    note: "The final buildable bridge was analytically strong and predicted to fail in compression.",
  },
  {
    metric: "Actual tested failure",
    value: "580 N",
    note: "The physical bridge failed at the front splice, only 42.4% of predicted capacity.",
  },
  {
    metric: "Final bridge mass",
    value: "704 g",
    note: "That corresponds to 0.824 N/g and a strength-to-self-weight ratio of 83.98.",
  },
];

const civ102Decisions = [
  {
    title: "Choosing a simple bridge form",
    body:
      "The team chose a simple pi-beam / box-girder style section over truss or trapezoidal options because it was more analyzable, more controllable, and more realistic to construct accurately from matboard. The point was not to reject strength, but to pursue a form whose behavior could be improved systematically.",
  },
  {
    title: "Letting failure modes drive iteration",
    body:
      "Design 0 made the real problem visible: the bridge was badly understrength, with thin-plate buckling case 1 controlling at a factor of safety of 0.597. From there, each change had to answer the current governing weakness rather than rely on intuition about what looked stronger.",
  },
  {
    title: "Accepting lower theoretical capacity for manufacturability",
    body:
      "The strongest evenly spaced diaphragm design reached 2.12 kN in analysis, but it could not fit on the sheet. That forced the project to sacrifice some predicted strength in order to become buildable, leading to the removal of the bottom flange, tighter web spacing, reduced flange layering, and a lower bridge depth.",
  },
  {
    title: "Treating splice reliability as a structural issue",
    body:
      "Final testing showed that the bridge did not fail in the predicted global compression mode. It failed at the front splice, where slight misalignment introduced a local weakness that the model did not capture. In hindsight, splice design and placement tolerance should have been treated as primary engineering decisions, not secondary construction details.",
  },
];

const civ102Skills = [
  "Structural optimization became a system problem, not a sequence of isolated geometry changes.",
  "Simple forms can be stronger engineering choices when they are easier to analyze, predict, and build accurately.",
  "Governing failure modes should direct iteration instead of intuition about what looks stronger.",
  "Manufacturability can overturn an analytically excellent design if it is treated too late.",
  "Local construction details such as splice geometry and alignment can dominate real performance even when the global model looks strong.",
];

const civ102CtmfLessons: Record<string, string> = {
  "challenge-assumptions":
    "Kept the bridge from becoming a blind optimization exercise by questioning form complexity early and splice confidence late.",
  "calculations-simulation":
    "Turned bridge iteration into a structured search through height, flange, web, diaphragm, and fitting tradeoffs, while the test later exposed what the model still missed.",
  "pugh-chart":
    "Used FOS comparison tables as a convergence matrix, but the final splice failure showed that clean convergence was not the same as complete understanding.",
};

const praxisIIClaims = [
  "Good engineering also requires protecting the design space from premature certainty.",
  "I value rigor, but Praxis II showed me that rigor can become a problem when it narrows the design space too early.",
  "A strong solution should support controlled transitions between warmth and precision instead of pretending one mode can do everything.",
];

const praxisIIStakeholders = [
  {
    title: "Active RASC observers",
    body: "Needed a solution that worked during real telescope setup, focusing, accessory handling, and observation tasks in winter conditions.",
  },
  {
    title: "Winter-limited participants",
    body: "Observers with circulation issues or cold sensitivity made it clear that the barrier was not only discomfort, but functionally losing dexterity outdoors at night.",
  },
  {
    title: "Event leaders and mentors",
    body: "Needed a low-burden, portable, reliable system that could work in field conditions without disrupting existing telescope workflows.",
  },
];

const praxisIIRequirements = [
  "Preserve functional fingertip dexterity rather than only making the user feel warmer.",
  "Remain compatible with low-light use, field portability, and existing telescope routines.",
  "Avoid bulky forms that interfere with fine manipulations such as focusing or handling accessories.",
  "Support a higher-dexterity mode when precision tasks still require exposed fingers.",
];

const praxisIIFeatures = [
  "Finger-focused resistive carbon-fiber heating concentrated where dexterity loss mattered most.",
  "Five equal heating lengths connected in parallel for stable heating without the drawbacks of a series layout.",
  "Wrist-mounted battery support so the hand was not burdened with weight that would reduce dexterity.",
  "Convertible fingerless glove with a flip-back outer section for controlled shifts between warmth and precision.",
  "Low-friction lining, stitched wire routing, velcro retention, and back-of-hand wiring to improve reliability and mobility.",
];

const praxisIIDecisions = [
  {
    title: "Narrowing the scope to human dexterity",
    body:
      "The project began with two possible pathways: preserve hand dexterity in winter, or redesign telescope interfaces so less dexterity was required. After stakeholder engagement and observation, the team scoped in to preserving the user’s dexterity directly because that addressed the repeated failure pattern more directly than redesigning every telescope interaction separately.",
  },
  {
    title: "Softening Beta objectives",
    body:
      "Earlier goals and objectives were highly detailed, but that precision started excluding viable concepts too early. Through Beta convergence, the team removed or softened objectives that had become too rigid so concept families could still be compared fairly before the project locked itself into one narrow interpretation of success.",
  },
  {
    title: "Converging on glove-based concepts",
    body:
      "The team considered environment systems, software guidance, hand attachments, and telescope-interface aids, but eventually focused testing effort on the heated glove path and a knob-turner attachment. The glove path remained because it addressed the user directly and responded to a broader pattern of dexterity-sensitive tasks than a single turning aid could solve.",
  },
  {
    title: "Separating dexterity testing from temperature testing",
    body:
      "Early cold-plunge tasks such as knob turning and Lego insertion produced unstable evidence because the room was too warm and body heat restored hand function too quickly. The team responded by separating dexterity and temperature tests before recombining them later, which made the staged testing logic itself an engineering decision.",
  },
  {
    title: "Concentrating heat only where it mattered",
    body:
      "Biomimetic divergence and later testing pushed the design toward localized, efficient thermal management. Because the system was voltage-limited, the best use of available energy was a single heating layer only on the fingers rather than spreading heat across the whole hand.",
  },
  {
    title: "Designing around mode changes instead of denying them",
    body:
      "Validation showed that some astronomy tasks still pushed users toward removing gloves for higher dexterity. Rather than treating that as a failure to eliminate completely, the project turned it into a design principle: support controlled transitions between thermal protection and high-precision interaction.",
  },
];

const praxisIISkills = [
  "A broad usability problem became stronger only after it was narrowed to the actual dexterity bottleneck.",
  "Verification and validation can reshape objectives, not just confirm a finished concept.",
  "Early precision in requirements can become a liability when it hardens the design space too soon.",
  "Testing procedures are themselves engineering decisions because bad evidence can misdirect convergence.",
  "A robust solution can be multi-modal when one operating mode cannot honestly satisfy every task.",
];

const praxisIICtmfLessons: Record<string, string> = {
  "root-cause-analysis":
    "Shifted the project from generic winter discomfort to the dexterity-manipulability mismatch that actually governed astronomy use.",
  "verification-validation":
    "Turned staged testing into evidence that reshaped both the concept direction and the criteria used to judge it.",
  biomimicry:
    "Opened divergence toward selective thermal logic, but only early; later decisions had to be justified by testing and electrical constraints.",
};

const PraxisIProjectPage = ({
  slug,
  detail,
  timelinePoint,
}: {
  slug: string;
  detail: (typeof PROJECT_DETAILS)[string];
  timelinePoint: (typeof WORK_TIMELINE)[number];
}) => {
  const praxisCtmfs = PROJECTS.filter((ctmf) => detail.ctmfRefs.includes(ctmf.slug));

  return (
    <main className="project-brutalist relative min-h-screen overflow-hidden text-[#f8f3e8]" style={selectableTextStyle}>
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-5 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b-[3px] border-black pb-6 md:mb-10">
          <RememberedBackLink fallbackHref="/?portal=work" fallbackLabel="Back to Timeline" />
          <div className="neo-chip -rotate-2 bg-[#ffd23c] px-4 py-2">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-black md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8 xl:p-10`}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-cyan-100"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {detail.course}
              </span>
              <span
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {timelinePoint.subtitle}
              </span>
            </div>

            <p
              className="mb-3 text-[0.72rem] uppercase tracking-[0.32em] text-sky-200/80"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connection to My Position
            </p>
            <h1
              className="max-w-4xl text-[2.9rem] leading-[0.94] text-white md:text-[4.4rem] xl:text-[5.5rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              {detail.title}
            </h1>

            <p
              className="mt-6 max-w-3xl text-lg leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Praxis I was the first project that showed me a design problem can fail at the level of
              framing, not just at the level of solution quality.
            </p>
            <p
              className="mt-4 max-w-3xl text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The project began as a quieter-can challenge, but testing suggested that the loudest part
              of the event was not simply depressurization. The final slider-based silent can only became
              possible once the team treated framing as an engineering decision rather than as a fixed
              assumption.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {praxisIClaims.map((claim) => (
                <div
                  key={claim}
                  className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {claim}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            <article className={`${lightPanelClass} overflow-hidden p-4`}>
              <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    Project Context
                  </p>
                  <h2
                    className="mt-2 text-3xl text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    What changed the problem
                  </h2>
                </div>
              </div>
              <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-[#e7ddd1]">
                <div className="relative h-[26rem] w-full">
                  <Image
                    src="/context-evidence/raw/praxis1-p2-img1.png"
                    alt="Praxis I can-opening noise test setup with a phone recording the decibel level beside a soda can."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p
                className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                This project matters because the testing result changed the logic of the problem, not
                just the ranking of solutions. Once the old explanation stopped holding, the team had to
                rethink what kind of mechanism could actually reduce the noise.
              </p>
            </article>

            <article className={`${darkPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Why This Matters
              </p>
              <div className="mt-5 grid gap-3">
                {[
                  "The can-opening event itself was the real disruption, not just the object being designed.",
                  "The vented-versus-unvented result weakened the original assumption about what caused the noise.",
                  "The slider became credible only after the team accepted that the mechanism itself had to change.",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    <span className="mr-3 text-sky-200/70">0{index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Opportunity Statement
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The project began as what looked like a straightforward product problem: how to make
              opening a soda can quieter in lecture halls, libraries, and other quiet academic spaces.
              That first framing made the challenge seem like an issue of controlling depressurization
              or damping the opening sound externally.
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The problem became less stable once testing suggested that the loudest part of the event
              was not simply gas escaping, but the fracture of the scored aluminum tear strip itself.
              The real opportunity therefore became more specific and more difficult: design a
              can-opening system that reduces the impulsive noise of opening a carbonated can while
              still preserving portability, safety, beverage integrity, and ease of use.
            </p>
          </article>

          <div className="grid gap-6">
            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Stakeholders
              </p>
              <div className="mt-5 grid gap-3">
                {praxisIStakeholders.map((stakeholder) => (
                  <div key={stakeholder.title} className="rounded-[1.25rem] border border-slate-900/10 bg-white/70 px-4 py-4">
                    <p
                      className="text-[0.7rem] uppercase tracking-[0.26em] text-slate-700/62"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {stakeholder.title}
                    </p>
                    <p
                      className="mt-2 text-sm leading-7 text-slate-900/78"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {stakeholder.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Key Design Requirements
              </p>
              <ul className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {praxisIRequirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="rounded-[1.2rem] border border-slate-900/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-900/78">
                    {requirement}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${lightPanelClass} overflow-hidden p-4`}>
            <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Final Engineering Solution
                </p>
                <h2
                  className="mt-2 text-3xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Slider-based silent can
                </h2>
              </div>
            </div>
            <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-white">
              <div className="relative h-[25rem] w-full">
                <Image
                  src="/context-evidence/raw/praxis1-p3-img2.png"
                  alt="Praxis I CAD rendering of the slider-based silent can lid mechanism."
                  fill
                  className="object-contain p-3"
                />
              </div>
            </div>
            <p
              className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final concept did not try to muffle the old mechanism from the outside. It changed the
              mechanism that was producing the noise in the first place.
            </p>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Why It Was Selected
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final proposed design was a slider-based silent can: a redesigned lid that replaces
              the traditional pull-tab tear-strip mechanism with a rotatable slider over a pre-formed
              opening. Instead of tearing the aluminum lid open in one abrupt event, the slider gradually
              reveals the vent area, spreading depressurization over a longer interval and reducing the
              sharp acoustic impulse.
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final design also included a raised tab to lower hand pressure and improve accessibility,
              along with an integrated gasket to improve sealing and reduce post-opening liquid and CO2
              loss. It was selected not because it was merely the last concept standing, but because it
              directly addressed the governing mechanism that the testing had exposed.
            </p>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
              <table className="min-w-full border-collapse" style={{ fontFamily: "var(--font-vercetti)" }}>
                <thead className="bg-white/8 text-left text-[0.68rem] uppercase tracking-[0.28em] text-sky-100/72">
                  <tr>
                    <th className="px-4 py-4">Measure</th>
                    <th className="px-4 py-4">Slider</th>
                    <th className="px-4 py-4">Comparison</th>
                    <th className="px-4 py-4">Why It Mattered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {praxisIMetrics.map((row) => (
                    <tr key={row.metric} className="align-top">
                      <td className="px-4 py-4 text-sm text-white">{row.metric}</td>
                      <td className="px-4 py-4 text-sm text-cyan-200">{row.slider}</td>
                      <td className="px-4 py-4 text-sm text-slate-300">{row.comparison}</td>
                      <td className="px-4 py-4 text-sm leading-7 text-slate-300">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p
              className="mt-6 text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              These results made the slider the strongest solution the team produced, but the deeper
              lesson was that its success depended on reframing the problem correctly rather than simply
              optimizing harder inside the original frame.
            </p>
          </article>
        </section>

        <section className={`${darkPanelClass} mt-6 p-6 md:p-8`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Key Engineering Design Decisions
              </p>
              <h2
                className="mt-3 text-4xl text-white"
                style={{ fontFamily: "var(--font-soria)" }}>
                Three decisions shaped the project more than the artifact itself
              </h2>
            </div>
            <p
              className="max-w-xl text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The decisive moments were not only about features. They were about how the team defined the
              problem, how it responded to evidence, and whether it was willing to let the frame change.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {praxisIDecisions.map((decision, index) => (
              <article
                key={decision.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.28em] text-sky-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  0{index + 1}
                </p>
                <h3
                  className="mt-3 text-2xl text-white"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  {decision.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-7 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {decision.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <article className="rounded-[1.6rem] border border-white/10 bg-[#101d2b] p-4">
              <div className="mb-4 px-2 pt-2">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Integrated Figure
                </p>
                <h3
                  className="mt-2 text-3xl text-white"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Evidence broke the original frame
                </h3>
              </div>
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b131d]">
                <div className="relative h-[25rem] w-full">
                  <Image
                    src="/context-evidence/praxis1-anchor.png"
                    alt="Composite Praxis I evidence showing the noise-testing setup and later written reflection about anchoring bias."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </article>

            <article className={`${lightPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Why This Matters In The Portfolio
              </p>
              <p
                className="mt-4 text-base leading-8 text-slate-900/82"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                The most important decision in Praxis I was not a design feature. It was the decision to
                continue inside a given frame after evidence had weakened it. That is why this project
                matters so much to the larger portfolio: it was the first time I saw that a team’s
                response to evidence reveals something about how it understands engineering itself.
              </p>
              <p
                className="mt-4 text-base leading-8 text-slate-900/72"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                The final design can still be coherent and well-justified while the process around it
                exposes unresolved framing issues. Praxis I therefore matters not just because of the
                artifact produced, but because it planted the position that became clearer later: good
                engineering depends on framing, not just solving.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <div className="grid gap-6">
            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Skills Gained
              </p>
              <ul className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {praxisISkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-[1.2rem] border border-slate-900/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-900/80">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>

            <article className={`${darkPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Teammate Credits
              </p>
              <p
                className="mt-4 text-sm leading-7 text-slate-300"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Shared design, evaluation, and presentation work for Praxis I was completed by the team
                below. This page presents the project as collaborative work within the course context.
              </p>
              <div className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {praxisITeam.map((name) => (
                  <div key={name} className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                    {name}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connecting CTMFs With Praxis I
            </p>
            <h2
              className="mt-3 text-4xl text-slate-950"
              style={{ fontFamily: "var(--font-soria)" }}>
              Three tools unpack the project in more detail
            </h2>
            <p
              className="mt-4 max-w-2xl text-sm leading-7 text-slate-800/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The CTMF pages carry the full reflections. Here, they work as signposts showing how the
              project was framed, expanded, and narrowed across the FDCR cycle.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {praxisCtmfs.map((ctmf) => (
                <RememberedLink
                  key={ctmf.slug}
                  href={`/ctmfs/${ctmf.slug}`}
                  returnHref={`/projects/${slug}`}
                  returnLabel="Back to Praxis I"
                  className="rounded-[1.45rem] border border-slate-900/10 bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-700/58"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    [{ctmf.stage.charAt(0)}] {ctmf.stage}
                  </p>
                  <h3
                    className="mt-3 text-[2rem] leading-tight text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    {ctmf.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-900/72"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {praxisICtmfLessons[ctmf.slug]}
                  </p>
                </RememberedLink>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

const CIV102ProjectPage = ({
  slug,
  detail,
  timelinePoint,
}: {
  slug: string;
  detail: (typeof PROJECT_DETAILS)[string];
  timelinePoint: (typeof WORK_TIMELINE)[number];
}) => {
  const civCtmfs = PROJECTS.filter((ctmf) => detail.ctmfRefs.includes(ctmf.slug));

  return (
    <main className="project-brutalist relative min-h-screen overflow-hidden text-[#f8f3e8]" style={selectableTextStyle}>
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-5 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b-[3px] border-black pb-6 md:mb-10">
          <RememberedBackLink fallbackHref="/?portal=work" fallbackLabel="Back to Timeline" />
          <div className="neo-chip -rotate-2 bg-[#ffd23c] px-4 py-2">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-black md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8 xl:p-10`}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-amber-100"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {detail.course}
              </span>
              <span
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {timelinePoint.subtitle}
              </span>
            </div>

            <p
              className="mb-3 text-[0.72rem] uppercase tracking-[0.32em] text-amber-200/80"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connection to My Position
            </p>
            <h1
              className="max-w-4xl text-[2.9rem] leading-[0.94] text-white md:text-[4.4rem] xl:text-[5.5rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              {detail.title}
            </h1>

            <p
              className="mt-6 max-w-3xl text-lg leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              CIV102 taught me that the strongest bridge is not the one with the highest analytical
              number. It is the strongest design that remains structurally credible, materially efficient,
              and buildable under real fabrication limits.
            </p>
            <p
              className="mt-4 max-w-3xl text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final pi-beam bridge was analytically strong, but the physical test exposed a front
              splice failure at 580 N. That mismatch made the real lesson visible: tradeoff management
              is not just about global section strength, but about whether local manufacturing details
              have been treated as true engineering decisions.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {civ102Claims.map((claim) => (
                <div
                  key={claim}
                  className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {claim}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            <article className={`${lightPanelClass} overflow-hidden p-4`}>
              <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    Project Context
                  </p>
                  <h2
                    className="mt-2 text-3xl text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    Why the bridge problem was harder than it looked
                  </h2>
                </div>
              </div>
              <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-[#e9e0d5]">
                <div className="relative h-[26rem] w-full">
                  <Image
                    src="/context-evidence/civ102-anchor.png"
                    alt="CIV102 composite showing the bridge cross-section, diaphragm spacing, and built bridge."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p
                className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                The bridge did not improve through one clean optimization path. Each iteration solved one
                governing problem while often creating another: buckling, material fit, splice placement,
                or manufacturability.
              </p>
            </article>

            <article className={`${darkPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Why This Matters
              </p>
              <div className="mt-5 grid gap-3">
                {[
                  "The bridge was always bounded by load, sheet size, and fabrication reality at the same time.",
                  "Analytical performance improved because the team kept redesigning around the current governing weakness.",
                  "The final test mattered because it exposed a local splice vulnerability the global model did not capture.",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    <span className="mr-3 text-amber-200/70">0{index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Opportunity Statement
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              At first glance, the CIV102 bridge project looked like a straightforward structural
              optimization problem: build the strongest possible bridge from a single sheet of matboard.
              In practice, the real challenge was to carry a moving 400 N train across a 1,200 mm span
              while staying inside tight geometric, material, and fabrication limits.
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Every structural improvement came with a competing cost. Increasing height improved bending
              resistance but made fitting the bridge onto the matboard harder. Adding reinforcement
              increased strength but consumed material. Optimizing one failure mode often exposed
              another. The project therefore became less about maximizing load in isolation and more
              about managing a tightly bounded structural system.
            </p>
          </article>

          <div className="grid gap-6">
            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Stakeholders
              </p>
              <div className="mt-5 grid gap-3">
                {civ102Stakeholders.map((stakeholder) => (
                  <div key={stakeholder.title} className="rounded-[1.25rem] border border-slate-900/10 bg-white/70 px-4 py-4">
                    <p
                      className="text-[0.7rem] uppercase tracking-[0.26em] text-slate-700/62"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {stakeholder.title}
                    </p>
                    <p
                      className="mt-2 text-sm leading-7 text-slate-900/78"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {stakeholder.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Key Design Requirements
              </p>
              <ul className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="rounded-[1.2rem] border border-slate-900/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-900/78">
                    {requirement}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${lightPanelClass} overflow-hidden p-4`}>
            <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Final Engineering Solution
                </p>
                <h2
                  className="mt-2 text-3xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Simple pi-beam, unequal diaphragm logic
                </h2>
              </div>
            </div>
            <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-white">
              <div className="relative h-[25rem] w-full">
                <Image
                  src="/context-evidence/raw/civ102-p3-img1.png"
                  alt="CIV102 matboard fitting layout showing how the bridge pieces were packed into a single sheet."
                  fill
                  className="object-contain p-3"
                />
              </div>
            </div>
            <p
              className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final bridge used a simple pi-beam configuration with a 100 mm double-layer top
              flange, two centered webs spaced 60 mm apart, and an unequal diaphragm layout concentrated
              where buckling demand was highest.
            </p>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Why It Was Selected
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final bridge was intentionally simple and constructible rather than visually complex.
              Instead of pursuing truss or trapezoidal forms, the design concentrated on a clean
              cross-section that could be modeled reliably, reinforced where compressive demand was
              highest, and cut from the matboard without creating impossible fabrication conditions.
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              A useful qualifier matters here: the final bridge was not simply the strongest design the
              team ever modeled, but the strongest design that remained structurally credible,
              materially efficient, and manufacturable within the project constraints.
            </p>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
              <table className="min-w-full border-collapse" style={{ fontFamily: "var(--font-vercetti)" }}>
                <thead className="bg-white/8 text-left text-[0.68rem] uppercase tracking-[0.28em] text-amber-100/72">
                  <tr>
                    <th className="px-4 py-4">Measure</th>
                    <th className="px-4 py-4">Value</th>
                    <th className="px-4 py-4">Why It Mattered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {civ102Metrics.map((row) => (
                    <tr key={row.metric} className="align-top">
                      <td className="px-4 py-4 text-sm text-white">{row.metric}</td>
                      <td className="px-4 py-4 text-sm text-amber-200">{row.value}</td>
                      <td className="px-4 py-4 text-sm leading-7 text-slate-300">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className={`${darkPanelClass} mt-6 p-6 md:p-8`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Key Engineering Design Decisions
              </p>
              <h2
                className="mt-3 text-4xl text-white"
                style={{ fontFamily: "var(--font-soria)" }}>
                Four decisions defined the bridge more than any single dimension
              </h2>
            </div>
            <p
              className="max-w-xl text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The bridge improved because the team kept changing what counted as the governing problem:
              first global buckling, then material fit, and finally splice sensitivity.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {civ102Decisions.map((decision, index) => (
              <article
                key={decision.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.28em] text-amber-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  0{index + 1}
                </p>
                <h3
                  className="mt-3 text-2xl text-white"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  {decision.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-7 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {decision.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <article className="rounded-[1.6rem] border border-white/10 bg-[#101d2b] p-4">
              <div className="mb-4 px-2 pt-2">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Analytical Constraint
                </p>
                <h3
                  className="mt-2 text-3xl text-white"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  The bridge had to fit before it could be strong
                </h3>
              </div>
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b131d]">
                <div className="relative h-[24rem] w-full">
                  <Image
                    src="/context-evidence/raw/civ102-p14-img1.png"
                    alt="CIV102 Python fitting output showing that an analytically strong bridge configuration could not fit on one matboard sheet."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </article>

            <article className={`${lightPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                What The Test Changed
              </p>
              <p
                className="mt-4 text-base leading-8 text-slate-900/82"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                The physical bridge failed at 580 N, not the predicted 1.367 kN. That matters because
                the model was not contradicted by a vague construction error somewhere in the bridge. The
                failure localized at the front splice, where slight off-center placement introduced a
                local weakness that dominated the whole structure before any broader distress became
                visible.
              </p>
              <p
                className="mt-4 text-base leading-8 text-slate-900/72"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                In other words, the final lesson of CIV102 was not simply that theory differs from
                practice. It was that splice reliability should have been modeled as part of the
                engineering problem itself. The global section was strong; the locally sensitive detail
                was not.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${lightPanelClass} overflow-hidden p-4`}>
            <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Observed Failure Mode
                </p>
                <h2
                  className="mt-2 text-3xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Front splice failure overruled the predicted compression mode
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white">
                <div className="relative h-[19rem] w-full">
                  <Image
                    src="/context-evidence/raw/civ102-splice-failure.jpg"
                    alt="CIV102 bridge with the front splice circled where the observed failure initiated."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white">
                <div className="relative h-[19rem] w-full">
                  <Image
                    src="/context-evidence/raw/civ102-failure.png"
                    alt="CIV102 bridge during testing after failure initiated at the splice."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <p
              className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Up until the splice failure, there were no clear visible signs of progressive failure
              elsewhere in the structure. The bridge underperformed because manufacturing uncertainty
              became the real governing condition.
            </p>
          </article>

          <div className="grid gap-6">
            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Skills Gained
              </p>
              <ul className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-[1.2rem] border border-slate-900/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-900/80">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>

            <article className={`${darkPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Implication For Future Iterations
              </p>
              <p
                className="mt-4 text-sm leading-7 text-slate-300"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                If this bridge were redesigned, the splice strategy would become a primary design problem.
                A better solution would reduce dependence on one long, sensitive splice and replace it
                with multiple smaller, more frequent splices distributed lower in the structure, where
                local misalignment would be less catastrophic.
              </p>
              <p
                className="mt-4 text-sm leading-7 text-slate-300"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                This is the central retrospective lesson of the page: analytical optimization is not
                enough if the bridge remains too vulnerable to fabrication uncertainty at one local
                detail.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-6">
          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connecting CTMFs With CIV102
            </p>
            <h2
              className="mt-3 text-4xl text-slate-950"
              style={{ fontFamily: "var(--font-soria)" }}>
              Four tools unpack the bridge in more detail
            </h2>
            <p
              className="mt-4 max-w-2xl text-sm leading-7 text-slate-800/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The CTMF pages carry the full reflections. Here, they work as signposts showing how the
              bridge was bounded, evaluated, represented, and revised as the governing problem changed.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {civCtmfs.map((ctmf) => (
                <RememberedLink
                  key={ctmf.slug}
                  href={`/ctmfs/${ctmf.slug}`}
                  returnHref={`/projects/${slug}`}
                  returnLabel="Back to CIV102"
                  className="rounded-[1.45rem] border border-slate-900/10 bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-700/58"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    [{ctmf.stage.charAt(0)}] {ctmf.stage}
                  </p>
                  <h3
                    className="mt-3 text-[1.9rem] leading-tight text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    {ctmf.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-900/72"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {civ102CtmfLessons[ctmf.slug]}
                  </p>
                </RememberedLink>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

const PraxisIIProjectPage = ({
  slug,
  detail,
  timelinePoint,
}: {
  slug: string;
  detail: (typeof PROJECT_DETAILS)[string];
  timelinePoint: (typeof WORK_TIMELINE)[number];
}) => {
  const praxisIICtmfs = PROJECTS.filter((ctmf) => detail.ctmfRefs.includes(ctmf.slug));

  return (
    <main className="project-brutalist relative min-h-screen overflow-hidden text-[#f8f3e8]" style={selectableTextStyle}>
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-5 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b-[3px] border-black pb-6 md:mb-10">
          <RememberedBackLink fallbackHref="/?portal=work" fallbackLabel="Back to Timeline" />
          <div className="neo-chip -rotate-2 bg-[#ffd23c] px-4 py-2">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-black md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8 xl:p-10`}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-emerald-100"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {detail.course}
              </span>
              <span
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {timelinePoint.subtitle}
              </span>
            </div>

            <p
              className="mb-3 text-[0.72rem] uppercase tracking-[0.32em] text-emerald-200/80"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connection to My Position
            </p>
            <h1
              className="max-w-4xl text-[2.9rem] leading-[0.94] text-white md:text-[4.2rem] xl:text-[5.2rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              {detail.title}
            </h1>

            <p
              className="mt-6 max-w-3xl text-lg leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Praxis II was the project where I learned that rigor can become overconstraint. The work
              improved only after the team stopped treating early precision as proof that the problem had
              already been understood well enough.
            </p>
            <p
              className="mt-4 max-w-3xl text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              What began as a broad winter-astronomy usability challenge eventually became a more precise
              mismatch between cold-impaired dexterity and the fine, repeated manipulations telescope use
              demands. The final convertible heated glove emerged from that shift, but so did the larger
              design lesson about protecting the design space from premature certainty.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {praxisIIClaims.map((claim) => (
                <div
                  key={claim}
                  className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {claim}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            <article className={`${lightPanelClass} overflow-hidden p-4`}>
              <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    Project Context
                  </p>
                  <h2
                    className="mt-2 text-3xl text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    Why the project narrowed before it converged
                  </h2>
                </div>
              </div>
              <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-[#e6efe7]">
                <div className="relative h-[26rem] w-full">
                  <Image
                    src="/context-evidence/praxis2-anchor.png"
                    alt="Praxis II composite showing scope narrowing and objective softening during the Beta release."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p
                className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                The key evidence here was not only the final glove. It was the project shift itself: the
                team scoped in, softened over-rigid objectives, and stopped excluding viable concepts
                before testing had earned that certainty.
              </p>
            </article>

            <article className={`${darkPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Why This Matters
              </p>
              <div className="mt-5 grid gap-3">
                {[
                  "The winter barrier was loss of dexterity, not just feeling cold.",
                  "The project became stronger once it narrowed from many system directions to preserving hand dexterity directly.",
                  "The final glove mattered because it supported controlled mode changes instead of pretending one state could satisfy every task.",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    <span className="mr-3 text-emerald-200/70">0{index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Opportunity Statement
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The Praxis II project began with a broad winter-astronomy problem: amateur astronomers in
              the GTA often struggle to operate telescopes in cold conditions. At first, that
              opportunity could be interpreted in two ways: preserve the user’s hand dexterity, or
              redesign telescope interfaces so less dexterity is required.
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The problem became more specific once the team recognized the real mismatch was between
              winter-impaired human dexterity and the fine, repeated, precision-heavy manipulations
              telescope use demands. That shift narrowed the challenge from general winter usability
              toward preserving manipulability under actual task conditions outdoors at night.
            </p>
          </article>

          <div className="grid gap-6">
            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Stakeholders
              </p>
              <div className="mt-5 grid gap-3">
                {praxisIIStakeholders.map((stakeholder) => (
                  <div key={stakeholder.title} className="rounded-[1.25rem] border border-slate-900/10 bg-white/70 px-4 py-4">
                    <p
                      className="text-[0.7rem] uppercase tracking-[0.26em] text-slate-700/62"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {stakeholder.title}
                    </p>
                    <p
                      className="mt-2 text-sm leading-7 text-slate-900/78"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {stakeholder.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${lightPanelClass} p-6 md:p-7`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Key Design Requirements
              </p>
              <ul className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {praxisIIRequirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="rounded-[1.2rem] border border-slate-900/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-900/78">
                    {requirement}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${lightPanelClass} overflow-hidden p-4`}>
            <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Final Engineering Solution
                </p>
                <h2
                  className="mt-2 text-3xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Convertible fingerless heated glove
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white">
                <div className="relative h-[23rem] w-full">
                  <Image
                    src="/context-evidence/raw/praxis2-image2.jpg"
                    alt="Praxis II telescope interaction context used to ground the winter astronomy use case."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white">
                <div className="relative h-[23rem] w-full">
                  <Image
                    src="/context-evidence/raw/praxis2-image4.png"
                    alt="Praxis II glove-box style test setup used during early thermal and dexterity experimentation."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <p
              className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final concept preserved dexterity directly rather than redesigning the telescope. It
              became a multi-dexterity modal glove because validation showed that some high-precision
              tasks still demanded a higher-dexterity mode.
            </p>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Why It Was Selected
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The final concept was a convertible fingerless heated glove system designed specifically
              for winter telescope operation. Resistive carbon-fiber heating was concentrated only along
              the fingers, where dexterity loss mattered most and limited electrical power could be used
              most efficiently. The battery was moved off the hand and onto a wrist-mounted support so
              the glove would not burden the hand with extra weight.
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Through validation, the glove evolved into a flip-back, multi-mode system. Instead of
              forcing one operating state to do everything, the final form supported controlled shifts
              between thermal protection and higher-dexterity interaction. That was the strongest move in
              the project because it responded honestly to the task conditions astronomers actually face.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {praxisIIFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {feature}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={`${darkPanelClass} mt-6 p-6 md:p-8`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Key Engineering Design Decisions
              </p>
              <h2
                className="mt-3 text-4xl text-white"
                style={{ fontFamily: "var(--font-soria)" }}>
                The project strengthened when the team changed what counted as useful evidence
              </h2>
            </div>
            <p
              className="max-w-xl text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Praxis II was not only a glove project. It was a convergence project about scope, testing
              structure, and what happens when early rigor starts behaving like a blocker instead of a
              guide.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {praxisIIDecisions.map((decision, index) => (
              <article
                key={decision.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.28em] text-emerald-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  0{index + 1}
                </p>
                <h3
                  className="mt-3 text-2xl text-white"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  {decision.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-7 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {decision.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <article className="rounded-[1.6rem] border border-white/10 bg-[#101d2b] p-4">
              <div className="mb-4 px-2 pt-2">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Staged Testing
                </p>
                <h3
                  className="mt-2 text-3xl text-white"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Evidence had to be structured before it could be trusted
                </h3>
              </div>
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b131d]">
                <div className="relative h-[24rem] w-full">
                  <Image
                    src="/context-evidence/raw/praxis2-image4.png"
                    alt="Praxis II glove-box test setup representing the staged testing approach."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </article>

            <article className={`${lightPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                What The Project Made Clear
              </p>
              <p
                className="mt-4 text-base leading-8 text-slate-900/82"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Praxis II made it clear that preserving dexterity was a more direct engineering response
                than redesigning every telescope interaction separately. It also showed that
                verification and validation matter before the end of the project because they help decide
                which objectives are actually meaningful once real use has been observed.
              </p>
              <p
                className="mt-4 text-base leading-8 text-slate-900/72"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                The deepest lesson was not simply “we made a heated glove.” It was that preserving
                manipulability required a solution that was thermally selective, electrically efficient,
                physically flexible, and honest about the fact that high-dexterity tasks still demand
                mode changes.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${lightPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Skills Gained
            </p>
            <ul className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisIISkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-[1.2rem] border border-slate-900/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-900/80">
                  {skill}
                </li>
              ))}
            </ul>
          </article>

          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connecting CTMFs With Praxis II
            </p>
            <h2
              className="mt-3 text-4xl text-slate-950"
              style={{ fontFamily: "var(--font-soria)" }}>
              Three tools unpack the project in more detail
            </h2>
            <p
              className="mt-4 max-w-2xl text-sm leading-7 text-slate-800/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              These CTMF pages carry the deeper reflections. On the project page, they act as signposts
              for the framing shift, the staged testing logic, and the generative reasoning that
              supported convergence.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {praxisIICtmfs.map((ctmf) => (
                <RememberedLink
                  key={ctmf.slug}
                  href={`/ctmfs/${ctmf.slug}`}
                  returnHref={`/projects/${slug}`}
                  returnLabel="Back to Praxis II"
                  className="rounded-[1.45rem] border border-slate-900/10 bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-700/58"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    [{ctmf.stage.charAt(0)}] {ctmf.stage}
                  </p>
                  <h3
                    className="mt-3 text-[2rem] leading-tight text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    {ctmf.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-900/72"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {praxisIICtmfLessons[ctmf.slug]}
                  </p>
                </RememberedLink>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

const GenericProjectPage = ({
  slug,
  detail,
  timelinePoint,
}: {
  slug: string;
  detail: (typeof PROJECT_DETAILS)[string];
  timelinePoint: (typeof WORK_TIMELINE)[number];
}) => {
  const relatedCtmfs = PROJECTS.filter((ctmf) => detail.ctmfRefs.includes(ctmf.slug)).slice(0, 4);
  const processSteps = [
    {
      id: "01",
      title: "Refinement",
      body: detail.process.refinement,
    },
    {
      id: "02",
      title: "Generation",
      body: detail.process.generation,
    },
    {
      id: "03",
      title: "Assessment",
      body: detail.process.assessment,
    },
  ];

  return (
    <main className="project-brutalist relative min-h-screen overflow-hidden text-[#f8f3e8]" style={selectableTextStyle}>
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[84rem] flex-col px-5 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b-[3px] border-black pb-6 md:mb-10">
          <RememberedBackLink fallbackHref="/?portal=work" fallbackLabel="Back to Timeline" />
          <div className="neo-chip -rotate-2 bg-[#ffd23c] px-4 py-2">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-black md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8 xl:p-10`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.course}
            </p>
            <h1
              className="mt-4 max-w-4xl text-[3rem] leading-[0.95] text-white md:text-[4.6rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              {detail.title}
            </h1>
            <p
              className="mt-6 max-w-3xl text-base leading-8 text-slate-200"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.overview}
            </p>
          </article>

          <aside className="grid gap-6">
            <article className={`${lightPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Timeline Position
              </p>
              <h2
                className="mt-3 text-3xl text-slate-950"
                style={{ fontFamily: "var(--font-soria)" }}>
                {timelinePoint.title}
              </h2>
              <p
                className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-700/58"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {timelinePoint.subtitle}
              </p>
            </article>

            <article className={`${lightPanelClass} p-6`}>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Related CTMFs
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {relatedCtmfs.map((ctmf) => (
                  <RememberedLink
                    key={ctmf.slug}
                    href={`/ctmfs/${ctmf.slug}`}
                    returnHref={`/projects/${slug}`}
                    returnLabel="Back to Project"
                    className="rounded-full border border-slate-900/10 bg-white/70 px-4 py-3 text-[0.72rem] uppercase tracking-[0.24em] text-slate-900/72 transition-transform duration-300 hover:-translate-y-1 hover:bg-white"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {ctmf.title}
                  </RememberedLink>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${lightPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Key Constraints
            </p>
            <ul className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
              {detail.criteria.map((criterion) => (
                <li
                  key={criterion}
                  className="rounded-[1.2rem] border border-slate-900/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-900/78">
                  {criterion}
                </li>
              ))}
            </ul>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Process Summary
            </p>
            <div className="mt-6 grid gap-4">
              {processSteps.map((step) => (
                <div key={step.id} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {step.id}
                  </p>
                  <h3
                    className="mt-3 text-2xl text-white"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    {step.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-200"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 flex flex-col gap-6">
          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Reflection
            </p>
            <blockquote
              className="mt-5 max-w-4xl text-[1.6rem] leading-[1.45] text-white md:text-[2.25rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              {detail.process.reflection}
            </blockquote>
          </article>

          <article className={`${lightPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Project Notes
            </p>
            <p
              className="mt-4 text-base leading-8 text-slate-900/78"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              This route will hold the fuller project summary, design decisions, and project-specific CTMF
              signposts as the portfolio expands. For now, it preserves the course context, core
              constraints, and the reflective thread connecting the work back to the larger portfolio.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const data = getProjectPageData(slug);

  if (!data) {
    notFound();
  }

  const { detail, timelinePoint } = data;

  if (slug === "praxis-i") {
    return <PraxisIProjectPage slug={slug} detail={detail} timelinePoint={timelinePoint} />;
  }

  if (slug === "civ102-bridge") {
    return <CIV102ProjectPage slug={slug} detail={detail} timelinePoint={timelinePoint} />;
  }

  if (slug === "praxis-ii") {
    return <PraxisIIProjectPage slug={slug} detail={detail} timelinePoint={timelinePoint} />;
  }

  return <GenericProjectPage slug={slug} detail={detail} timelinePoint={timelinePoint} />;
};

export default ProjectPage;

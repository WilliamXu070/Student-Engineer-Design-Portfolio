import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { notFound } from "next/navigation";

import CitationText from "@/app/components/common/CitationText";
import { FigureReferenceText, getFigureAnchorId, type FigureReferenceMap } from "@/app/components/common/FigureReferenceText";
import HidePortalCloseButton from "@/app/components/common/HidePortalCloseButton";
import RememberedBackLink from "@/app/components/common/RememberedBackLink";
import RememberedLink from "@/app/components/common/RememberedLink";
import {
  getFdcrStageLabel,
  getFdcrStageTheme,
  PROJECT_DETAILS,
  PROJECTS,
  WORK_TIMELINE,
} from "@constants";
import acousticImpulseChart from "@/app/projects/praxis1-media/acoustic-impulse-chart.png";
import co2Chart from "@/app/projects/praxis1-media/co2-chart.png";
import contactPressureChart from "@/app/projects/praxis1-media/contact-pressure-chart.png";
import morphChart from "@/app/projects/praxis1-media/morph-chart.jpg";
import needleVentConcept from "@/app/projects/praxis1-media/needle-vent-concept.png";
import rubberTabConcept from "@/app/projects/praxis1-media/rubber-tab-concept.png";
import waterOpenerConcept from "@/app/projects/praxis1-media/water-opener-concept.png";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectAnnotation = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  accent: string;
  depth: "front" | "back";
  positionClassName: string;
  rotationClassName: string;
};

type PraxisIFigure = {
  kind?: "image" | "video";
  refKey?: string;
  src: string | StaticImageData;
  alt: string;
  caption: string;
  label: string;
  imageClassName?: string;
  posterSrc?: string;
};

type PraxisIMetricCard = {
  metric: string;
  slider: string;
  comparison: string;
  note: string;
};

type PraxisIPhase = {
	id: string;
	title: string;
	body: string;
};

type ProjectCtmfSynthesisEntry = {
	title: string;
	body: string;
};

type ProjectCtmfSynthesis = {
	title: string;
	intro: string;
	entries: ProjectCtmfSynthesisEntry[];
	closing: string;
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

const praxisIOverviewParagraphs = [
  "Praxis I began with a design problem that seemed simple and was therefore easy to underestimate. Opening a carbonated beverage can in a lecture hall, library, or study space creates a sharp acoustic impulse that can briefly disrupt the room, and research on young students has shown that noise exposure can affect learning, motivation, and memory [[cite:noise-learning-motivation-memory]]. The project therefore began with a clear need: reduce the noise of can opening without making the product harder to use, less safe, or less believable as an everyday object.",
  "The project stopped being a straightforward noise-reduction exercise once our original explanation of the problem began to weaken. Early on, we treated depressurization as the main source of the disturbance and assumed the task was simply to soften an opening event we already understood. As testing progressed, that assumption became harder to defend, and the more important question became what was actually causing the sharp impulse in the first place. That shift changed more than the ranking of concepts. It changed the logic of the design problem itself [[cite:praxis1-report]].",
];

const praxisIObjectivesParagraphs = [
  "The project's objective was to design a quieter can-opening approach for use in quiet academic and public settings while preserving usability, cleanliness, portability, and beverage integrity. That objective was shaped by several stakeholder groups whose needs pushed the project beyond a narrow make it quieter target.",
  "Students and educators needed a solution that could reduce a disruptive opening event in lecture halls, libraries, and similar quiet spaces. Users with reduced strength or dexterity pushed the design toward lower hand pressure, fewer gestures, and a more accessible interaction. Manufacturers and regulators introduced pressures around compactness, hygiene, food-safe contact, and conceptual compatibility with familiar can geometry and use patterns. Together, these stakeholders made clear that success could not be defined by decibel reduction alone [[cite:praxis1-converging-doc]].",
];

const praxisIStakeholders = [
  {
    title: "Students and educators",
    body: "Needed a solution that could reduce a disruptive opening event in lecture halls, libraries, and similar quiet spaces.",
  },
  {
    title: "Users with reduced strength or dexterity",
    body: "Pushed the design toward lower hand pressure, fewer gestures, and a more accessible interaction.",
  },
  {
    title: "Manufacturers and regulators",
    body: "Introduced pressures around compactness, hygiene, food-safe contact, and conceptual compatibility with familiar can geometry and use patterns.",
  },
];

const praxisIRequirementsParagraphs = [
  "From those stakeholder pressures, our team developed a requirement set that defined what a viable solution had to protect while reducing noise. The design needed to produce strong peak-noise reduction during opening, minimize liquid loss, control CO2 boil-off, remain portable for everyday use, allow accessible low-force interaction, and maintain safe, clean contact around the drinking surface. Success was therefore defined by whether a concept could make opening quieter while still preserving the conditions that made the can practical and credible in everyday use.",
  "The concepts were then compared through peak noise, liquid loss, CO2 retention, hand pressure, and gesture count, since those criteria captured both performance and usability [[cite:praxis1-pugh-chart-2]].",
];

const praxisIRequirements = [
  "Strong peak-noise reduction during opening",
  "Minimize liquid loss",
  "Control CO2 boil-off",
  "Remain portable for everyday use",
  "Allow accessible low-force interaction",
  "Maintain safe, clean contact around the drinking surface",
];

const praxisIFinalSolutionParagraphs = [
  "The final concept was a slider-based silent can. Instead of relying on the traditional pull-tab tear-strip event, the design replaced that mechanism with a rotatable slider positioned over a pre-formed opening. This allowed the opening area to be revealed gradually rather than all at once, spreading the release event over a longer interval and reducing the sharp acoustic impulse associated with conventional can opening.",
  "The final concept also included a raised tab to reduce required hand pressure and improve accessibility, as well as an integrated gasket to improve sealing and reduce post-opening liquid and CO2 loss. The key strength of the concept was that it did not merely attempt to damp the old mechanism from outside. It replaced the mechanism responsible for the noise event itself [[cite:praxis1-report]].",
];

const praxisISelectionParagraphs = [
  "The final slider concept was selected only after the team worked through several different approaches to quiet can opening. Early concept generation explored mechanisms that tried to vent, damp, modify, or replace the standard opening event: a needle-straw vent, a water opener, a rubber-tab attachment, and the slider mechanism (see [[fig:04|Figs. 04-06]]). The needle-straw and water-opener directions weakened because they added safety, contamination, liquid-loss, or interaction burdens. The rubber tab stayed more credible for longer because it modified the existing tab, but it still depended on softening the old opening event rather than changing the event responsible for the sharp impulse.",
  "The slider was selected because it performed best against the measured criteria while also matching the revised understanding of the problem. Compared with the control can, it reduced peak noise from 102 dB to 61 dB, cut liquid loss from 0.70% to 0.46%, limited CO2 boil-off over 90 seconds to 0.4 g compared with 1.3 g for the control and 1.2 g for the rubber-tab concept (see [[fig:10]]), lowered maximum hand pressure to 80 kPa compared with 135 kPa for the rubber tab and 600 kPa for the water opener (see [[fig:09]]), and required only two gestures instead of three or five. These results made it the strongest overall concept because it improved the acoustic outcome without breaking the other evaluation criteria [[cite:praxis1-report]].",
];

const praxisIMetrics: PraxisIMetricCard[] = [
  {
    metric: "Peak noise",
    slider: "61 dB",
    comparison: "Control can: 102 dB",
    note: "Reduced the sharp opening impulse by 41 dB.",
  },
  {
    metric: "Liquid loss",
    slider: "0.46%",
    comparison: "Control can: 0.70%",
    note: "Improved noise performance without increasing spill risk.",
  },
  {
    metric: "CO2 boil-off over 90 s",
    slider: "0.4 g",
    comparison: "Control: 1.3 g | Rubber tab: 1.2 g",
    note: "Preserved beverage integrity best across the tested concepts.",
  },
  {
    metric: "Maximum hand pressure",
    slider: "80 kPa",
    comparison: "Rubber tab: 135 kPa | Water opener: 600 kPa",
    note: "Improved accessibility alongside noise reduction.",
  },
  {
    metric: "Gestures required",
    slider: "2 gestures",
    comparison: "Rubber tab: 3 | Water opener: 5",
    note: "Stayed compact without becoming cumbersome to use.",
  },
];

const praxisIDecisionsIntro = "Three engineering decisions shaped the project most strongly.";

const praxisIDecisions = [
  {
    title: "Clarifying the problem through stakeholder input",
    body:
      "Stakeholder input showed that the opening experience involved more than sound, which kept the team from judging concepts too narrowly around noise alone.",
  },
  {
    title: "Reframing the can expanded the design space",
    body:
      "Reframing the problem required the team to stop treating the standard can as fixed. Early concepts stayed limited to attachments and external interventions, while that shift opened more direct ways to change the opening event itself.",
  },
  {
    title: "Generating many variations within the same solution type",
    body:
      "A third major decision was to explore multiple concepts within the same solution category rather than settling on a single rough idea.",
  },
];

const praxisIProcessParagraphs = [
  "The design process was iterative because the project returned to framing after evidence weakened the initial explanation. Early concepts such as vents, damping, and tab attachments came from the original frame, but that work relied on an assumption that had not yet been tested.",
  "Testing then acted less as validation and more as diagnosis. Once results suggested the tear-strip fracture mattered more than expected, our team reframed the problem and opened a new concept space where mechanism redesign became reasonable. Convergence only became meaningful after that shift.",
];

const praxisIPhases: PraxisIPhase[] = [
  {
    id: "01",
    title: "Initial frame",
    body: "The project began as a quieter-can challenge, so divergence focused on retrofit concepts such as vents, damping, and tab attachments.",
  },
  {
    id: "02",
    title: "Contradictory evidence",
    body: "Vented and unvented openings produced similar dB levels, which weakened the original belief that depressurization alone caused the sharp impulse.",
  },
  {
    id: "03",
    title: "Reframed opportunity",
    body: "Once the tear-strip fracture became central, the opportunity shifted from softening the old event to redesigning the opening mechanism itself.",
  },
  {
    id: "04",
    title: "Meaningful convergence",
    body: "The slider only became the strongest concept after the criteria matched the revised logic of the problem and not the earlier assumption set.",
	},
];

const praxisICtmfSynthesis: ProjectCtmfSynthesis = {
	title: "How The CTMFs Changed This Project",
	intro:
		"Praxis I only became coherent once the CTMFs began doing different kinds of work. One clarified what the project had to protect, another widened the mechanism space, and another made convergence defensible only after the frame improved.",
	entries: [
		{
			title: "Stakeholder analysis changed what the project had to protect",
			body:
				"Primary student conversations expanded the problem beyond noise by surfacing spill control, beverage disturbance, awkward finger interaction, and opening burden. The final recommendation therefore had to protect usability, beverage integrity, and accessibility, not only reduce dB.",
		},
		{
			title: "The morph chart changed what kinds of concepts could be compared",
			body:
				"The morph chart made divergence more systematic by generating the concept families later carried into convergence: needle-straw, water opener, rubber tab, and slider. Its limit was that it still assumed the problem could be solved through venting, damping, or managing the existing opening event, so it widened implementation diversity more than explanatory diversity.",
		},
		{
			title: "Convergence tools only became trustworthy once the frame improved",
			body:
				"The Pugh-style comparison and measured criteria helped defend the slider against the remaining alternatives only after vented-versus-unvented testing weakened the original depressurization story. Convergence became meaningful only once the criteria were aligned with a better explanation of the noise event.",
		},
	],
	closing:
		"Taken together, these CTMFs taught me that a project can look systematic while still being wrong at the level of framing. Praxis I changed my process by making me treat framing, divergence, and convergence as moves that must remain responsive to evidence rather than as fixed steps that automatically build on one another.",
};

const praxisILearningParagraphs = [
  "Praxis I showed that testing can force a team to confront a framing error rather than simply compare solutions within an accepted problem definition. Before this project, I tended to treat evidence as something used later in the process, once the work had already narrowed and a final direction needed support. What this project made clear was less comfortable: evidence can show that the problem itself has been specified incorrectly, so the real task is not to rank concepts more carefully, but to reopen the logic that produced them.",
  "The project also changed how I think about convergence. Concept comparison only becomes meaningful when the criteria arise from a sound account of the problem, since a matrix can appear rigorous while still inheriting the weakness of a bad frame. In Praxis I, convergence became more credible only after the framing improved, which made the process less tidy, less linear, and more intellectually honest [[cite:praxis1-reflection]].",
];

const praxisIReflectionParagraphs = [
  "This project matters in my portfolio because it was the first time I saw clearly that engineering can fail at the level of framing, not only at the level of solution quality. A team can reason carefully, compare systematically, and still converge on the wrong problem. That changed how I judge design quality. I now care not only about how well a project answers its question, but whether that question remains defensible as evidence develops. Once the logic of the frame begins to fail, I would rather reopen the problem than keep refining an answer built on it [[cite:praxis1-reflection]].",
];

const praxisITeamCredit =
  "Praxis I was completed collaboratively within the course team, with each member\'s responsibilities are outlined below:";

const praxisITeam = [
  {
    name: "Katherine Chen",
    role: "Performed prototype testing across the concept set.",
  },
  {
    name: "Shupeng Liu",
    role: "Developed the morph chart used to structure early concept generation.",
  },
  {
    name: "Issac Ng",
    role: "Performed prototype testing and contributed to interviews and stakeholder analysis.",
  },
  {
    name: "William Xu",
    role: "Developed the Pugh chart, produced the CAD for all prototypes, and helped to develop the morph chart.",
  },
];

const praxisIFigures: Record<string, PraxisIFigure> = {
  testing: {
    kind: "video",
    refKey: "01",
    src: "/api/videos/praxis1",
    posterSrc: "/context-evidence/raw/praxis1-p2-img1.png",
    alt: "Praxis I noise-testing video showing the phone-based decibel recording beside a soda can during opening.",
    caption: "Noise-testing video with phone-based dB recording beside a soda can. The project stopped being a simple noise-muffling exercise once this evidence began to contradict the original explanation.",
    label: "Fig. 01",
    imageClassName: "object-cover",
  },
  slider: {
    refKey: "02",
    src: "/api/images/praxis1-annotated",
    alt: "Annotated CAD view of the Praxis I slider-based silent can concept.",
    caption: "Annotated CAD of the slider-based lid showing the slider, pre-formed opening, raised tab, and gasket.",
    label: "Fig. 02",
    imageClassName: "object-contain p-4",
  },
  sliderAnimation: {
    kind: "video",
    refKey: "03",
    src: "/api/videos/praxis1-slider-animation",
    alt: "Praxis I slider animation showing the silent-can opening mechanism in motion.",
    caption: "Slider animation showing the opening mechanism in motion during the final solution stage.",
    label: "Fig. 03",
    imageClassName: "object-contain p-4",
  },
  anchor: {
    kind: "video",
    refKey: "11",
    src: "/api/videos/praxis1-water-opener",
    alt: "Praxis I sound test video for the water-opener concept during acoustic testing.",
    caption: "Water-opener sound test showing that muffling the user action did not remove the sharp opening impulse. This supported the later reframing: the dominant sound came from tearing the scored aluminum ligament, so the stronger solution was to remove the tear-strip mechanism rather than damp it from outside.",
    label: "Fig. 11",
    imageClassName: "object-cover",
  },
  reflection: {
    refKey: "12",
    src: "/context-evidence/raw/praxis1-p3-img1.png",
    alt: "Praxis I written reflection on anchoring bias and reframing during the diverging stage.",
    caption: "This reflection excerpt records the process lesson that followed the conflicting test evidence: our team had stayed anchored to the original framing for too long, and the project only improved once that assumption was explicitly reconsidered.",
    label: "Fig. 12",
    imageClassName: "object-cover",
  },
  morph: {
    refKey: "07",
    src: morphChart,
    alt: "Praxis I morph chart used during the diverging stage to explore alternative concepts for noise reduction.",
    caption: "Morphological chart showing the retrofit concept space that grew out of the original depressurization frame.",
    label: "Fig. 07",
    imageClassName: "object-cover",
  },
  acoustic: {
    refKey: "04",
    src: acousticImpulseChart,
    alt: "Acoustic impulse comparison over time for the control can and the slider concepts.",
    caption: "Acoustic impulse comparison graph showing how the different versions of the slider prototype spread the opening event over time compared to the control (normal aluminum can).",
    label: "Fig. 04",
    imageClassName: "object-contain bg-white p-3",
  },
  pressure: {
    refKey: "05",
    src: contactPressureChart,
    alt: "Opening contact pressure comparison for the control can and the slider concepts.",
    caption: "Opening contact pressure comparison graph showing how the slider design also improved accessibility by spreading the hand pressure over a longer duration, compared to the sharp peak pressure of the control.",
    label: "Fig. 05",
    imageClassName: "object-contain bg-white p-3",
  },
  co2: {
    refKey: "06",
    src: co2Chart,
    alt: "CO2 boil-off comparison between the control can and slider designs.",
    caption: "CO2 boil-off comparison chart showing how the slider design also improved the CO2 retention rate.",
    label: "Fig. 06",
    imageClassName: "object-contain bg-white p-3",
  },
  needle: {
    refKey: "08",
    src: needleVentConcept,
    alt: "Praxis I puncture vent concept sketch from the early retrofit concept space.",
    caption: "Early puncture-vent concept, in which the aluminum can was replaced with a thin puncturable membrane, similar to Kool-Aid Jammers pouch reference designs [[cite:kool-aid-jammers-product]].",
    label: "Fig. 08",
    imageClassName: "object-contain bg-white p-3",
  },
  water: {
    refKey: "09",
    src: waterOpenerConcept,
    alt: "Praxis I water-opener concept render from the early retrofit concept space.",
    caption: "Water-damping concept, in which the top lid of an alunimum can was covered with liquid to muffle the acoustic impulse from the can opening.",
    label: "Fig. 09",
    imageClassName: "object-contain bg-white p-3",
  },
  rubber: {
    refKey: "10",
    src: rubberTabConcept,
    alt: "Praxis I rubber-tab concept render from the early retrofit concept space.",
    caption: "Rubber-tab attachment concept, in which the tear line of the alunimum can was covered to absorb the acoustic effect and muffle the acoustic impulse generated.",
    label: "Fig. 10",
    imageClassName: "object-contain bg-white p-3",
  },
};

const praxisICtmfLessons: Record<string, string> = {
  "stakeholder-mapping":
    "Turned the NGOs into requirements so the project could not collapse into decibel reduction alone.",
  "morphological-chart":
    "Broadened the mechanism space, but also showed that divergence had to be rebuilt once testing weakened the original depressurization frame.",
  "pugh-chart-praxis-i":
    "Made convergence discussable, but only after the frame and criteria were strong enough that the matrix meant more than neat scoring.",
};
const praxisIFigureReferences: FigureReferenceMap = Object.fromEntries(
  Object.values(praxisIFigures)
    .filter((figure): figure is PraxisIFigure & { refKey: string } => Boolean(figure.refKey))
    .map((figure) => [
      figure.refKey,
      {
        href: `#${getFigureAnchorId("praxis-i", figure.refKey)}`,
        label: figure.label,
      },
    ]),
);

const renderProjectFigureMedia = (figure: PraxisIFigure, videoLabel: string) => {
  if (figure.kind === "video" && typeof figure.src === "string") {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        poster={figure.posterSrc}
        aria-label={videoLabel}
        className={`h-full w-full ${figure.imageClassName ?? "object-cover"}`}>
        <source src={figure.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <Image
      src={figure.src}
      alt={figure.alt}
      fill
      sizes="(max-width: 1279px) 100vw, 40vw"
      className={figure.imageClassName}
    />
  );
};

const civ102Claims = [
  "1200 mm span, moving-train loading, and failure-load prediction made this a structural system problem rather than a single optimization exercise.",
  "The final bridge was selected because it stayed analyzable, fit on one sheet, and remained buildable under real fabrication limits.",
  "The most important result was not the predicted 1.367 kN capacity, but the 580 N splice failure that exposed local fabrication sensitivity.",
];

const civ102OverviewParagraphs = [
  "The CIV102 bridge project asked teams to design and build a small-scale matboard box-girder bridge that could carry a moving train across a 1200 mm span, then survive increasing loads until failure while also predicting that failure load as accurately as possible. At first, what looked like a pure structural optimization problem was actually a constrained engineering problem in which analysis, geometry, material limits, and fabrication all interacted.",
  "The bridge problem got harder once our team had to actually design the geometry and figure out how the bridge would be cut. Every increase in strength competed with something else: material usage, sheet fitting, assembly difficulty, splice reliability, or buckling risk. Increasing height improved bending resistance but made fitting the bridge onto one matboard sheet harder; adding reinforcement improved capacity but consumed material and complicated construction. The project therefore became less about maximizing one number and more about building the strongest bridge that remained structurally credible and manufacturable under the actual rules of the assignment [[cite:civ102-design-report]].",
];

const civ102ObjectivesParagraphs = [
  "The project’s primary objective was to design and build a bridge that could support large gravity loads across a 1200 mm span using only the permitted materials, while using beam theory and thin-plate buckling theory to predict the maximum load before failure. Teams were also required to document their design decisions, communicate the design through drawings, and demonstrate planning and prototyping throughout the construction process.",
  "Within the project itself, three stakeholder pressures mattered most. First, the moving-load test governed the bridge as a structural system: bending, shear, and buckling had to be controlled across the span under a train that moved and progressively increased in weight. Second, material and fabrication limits acted as stakeholders of their own, because one 813 mm x 1016 mm x 1.27 mm sheet of matboard and two tubes of contact cement meant that strength could never be separated from cutting, fitting, splicing, and assembly logic. Third, geometric constraints forced the bridge to remain usable as a track: the total length had to fall between 1250 mm and 1270 mm, the deck had to stay horizontal, at least 100 mm wide, and below the allowed height above the supports [[cite:civ102-handout-2025]].",
];

const civ102Stakeholders = [
  {
    title: "Moving-load test",
    body: "Bending, shear, and buckling had to be controlled across the span under a train that moved and progressively increased in weight.",
  },
  {
    title: "Material and fabrication limits",
    body: "One 813 mm x 1016 mm x 1.27 mm sheet of matboard and two tubes of contact cement meant that strength could never be separated from cutting, fitting, splicing, and assembly logic.",
  },
  {
    title: "Geometric constraints",
    body: "The total length had to fall between 1250 mm and 1270 mm, the deck had to stay horizontal, at least 100 mm wide, and below the allowed height above the supports.",
  },
];

const civ102RequirementsParagraphs = [
  "The bridge had to meet fixed geometric and material constraints. It had to span 1200 mm, be at least 1250 mm long, keep the track horizontal and clear, provide a deck width of at least 100 mm, stay within the height limit, and rest on 60 mm flat supports at both ends. It also had to use only the provided matboard and contact cement.",
  "The loading requirements made the design problem more demanding than a single static case. The bridge first had to survive a 400 N moving train load, then withstand progressively heavier passes under a second loading case. Because the later sequence was undisclosed, the design had to be robust rather than tuned to one exact load.",
  "The grading scheme clarified what counted as success. Marks depended on construction quality, bridge performance, and failure-load prediction accuracy. In other words, the bridge had to be well built, strong in testing, and supported by a credible analytical model [[cite:civ102-handout-2025]].",
];

const civ102Requirements = [
  "Span 1200 mm between supports and remain at least 1250 mm long overall.",
  "Keep the track horizontal, unobstructed, at least 100 mm wide, and within the allowed height envelope.",
  "Rest on 60 mm flat support regions at both ends.",
  "Use only the provided matboard and contact cement, with handout-defined material properties.",
  "Survive the 400 N moving train load first, then heavier undisclosed passes under Load Case 2.",
  "Balance construction quality, tested strength, and prediction accuracy rather than optimize one metric alone.",
];

const civ102FinalSolutionParagraphs = [
  "The final bridge was a restrained pi-beam box-girder design shaped by structural clarity and constructability rather than geometric complexity. It used a 100 mm double-layer top flange, two centered webs spaced 60 mm apart, and an unequal diaphragm arrangement concentrated in the regions most vulnerable to buckling. The geometry was intentionally simpler than more ambitious alternatives because our team prioritized a form that could be analyzed reliably, fit on a single sheet, and be assembled with enough consistency for the calculations to remain meaningful.",
  "The design was chosen as the strongest option that still remained structurally credible, materially efficient, and feasible to manufacture. A more aggressive diaphragm arrangement reached 2.12 kN in analysis, though it could not fit on one matboard sheet and was therefore never a viable final candidate. The selected bridge accepted a lower predicted capacity in exchange for a design that could actually be cut, assembled, and tested within the fabrication constraints of the project [[cite:civ102-design-report]].",
];

const civ102SelectionParagraphs = [
  "The final bridge produced a mixed but informative result. On paper, the completed pi-beam was predicted to fail at 1.367 kN with a mass of 704 g, giving 0.824 N/g and a strength-to-self-weight ratio of 83.98.",
  "In testing, the bridge failed at 580 N, or 42.4% of the predicted capacity, and it failed at the front splice rather than in the expected global compression mode. When we examined the wreckage, we found that the splice had been placed asymmetrically across the splice joint, which turned lateral forces into shear stress at the joint. This showed that the bridge was limited less by global section behavior and more by poor fabrication, especially splice design [[cite:civ102-performance-summary]].",
];

const civ102Metrics = [
  {
    metric: "Design 0 predicted failure",
    value: "260 N",
    note: "The starting bridge was well below the required train case because thin-plate buckling case 1 governed early.",
  },
  {
    metric: "Design 1 predicted failure",
    value: "668 N",
    note: "Doubling the top flange improved compression resistance enough to clear the baseline moving-load case.",
  },
  {
    metric: "Peak analytical iteration",
    value: "2.12 kN",
    note: "The evenly spaced diaphragm variant was very strong on paper, but it could not fit on one sheet or be built credibly.",
  },
  {
    metric: "Final predicted failure",
    value: "1.367 kN",
    note: "The final buildable bridge remained analytically strong while respecting sheet fit and fabrication limits.",
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

const civ102DecisionsIntro =
  "Three engineering decisions shaped the bridge design.";

const civ102Decisions = [
  {
    title: "Choose a simple bridge form",
    body:
      "Our team chose a pi-beam box-girder section over truss and trapezoidal alternatives because it gave us more control over the whole design process: the section was easier to analyze systematically, easier to construct accurately in matboard, and easier to revise once the governing weakness became clear. The value of that choice was not for simplicity\'s sake, but the fact that a more legible geometry made iteration more disciplined and more responsive to evidence.",
  },
  {
    title: "Let governing failure modes drive iteration",
    body:
      "Design 0 made the first real weakness visible: the bridge was badly understrength, with thin-plate buckling case 1 controlling at a factor of safety of 0.597. From that point onward, major changes were made in response to whichever failure mode currently governed, not to whatever geometry looked stronger in isolation.",
  },
  {
    title: "Accept lower theoretical capacity for a buildable design",
    body:
      "Once the strongest evenly spaced diaphragm iteration proved impossible to fit on a single matboard sheet, the bridge had to be redesigned into a form that could actually be fabricated. That tradeoff led to removing the bottom flange, tightening the web spacing, reducing flange layering, and lowering the bridge depth, so the final design emerged not from chasing the highest analytical load, but from accepting that sheet fitting and assembly were structural constraints with as much authority as the calculations themselves.",
  },
];

const civ102ProcessParagraphs = [
  "The handout framed the project as an iterative process: analyze the baseline bridge, identify the governing weakness, revise the geometry, and repeat while balancing strength, material limits, and buildability.",
  "Our bridge followed that pattern. It moved from an understrength baseline to analytically stronger concepts, then back toward a simpler final form that was easier to fabricate. Each iteration resolved one weakness while introducing another, especially between strength, sheet fitting, and construction complexity.",
  "The most important revision came after testing, when failure at the front splice rather than in the expected global mode showed that local fabrication vulnerability had been underestimated [[cite:civ102-design-report]].",
];

const civ102Skills = [
  "Structural optimization became a system problem, not a sequence of isolated geometry changes.",
  "Simple forms can be better engineering choices when they are easier to analyze, predict, and build accurately.",
  "Global analytical strength can be overruled by local detail sensitivity if splice geometry and fabrication tolerance are treated too lightly.",
];

const civ102Phases: PraxisIPhase[] = [
  {
    id: "01",
    title: "Baseline understrength",
    body: "Design 0 established that the bridge was not close to acceptable performance and that thin-plate buckling case 1 governed the system early.",
  },
  {
    id: "02",
    title: "Strength through flange logic",
    body: "Later iterations improved the compression side of the bridge, especially through top-flange changes that lifted the predicted failure load above the required train case.",
  },
  {
    id: "03",
    title: "Peak analysis versus sheet fit",
    body: "Aggressive diaphragm layouts drove the analysis upward, but the bridge then failed a different test: the design could not fit on one sheet or be assembled credibly.",
  },
  {
    id: "04",
    title: "Physical test as final correction",
    body: "The built bridge reframed the project one more time, because the real failure came from the front splice rather than the predicted global compression mode.",
  },
];

const civ102LearningParagraphs = [
  "CIV102 taught me that structural optimization is not just a matter of changing geometry until the calculations improve, because analytical strength means little once local details, fabrication quality, and construction tolerances begin to weaken the load path the model assumes. The final splice failure made this fact apparant: the bridge was limited less by the predicted global mode than by a local weakness created at the joint itself.",
  "The project also clarified why simpler forms can be stronger engineering choices, because they are easier to analyze, predict, and build accurately. The final test also showed the limit of that clarity: the bridge did not fail in the predicted global mode, but at the splice, where alignment and fabrication had created the real weak point [[cite:civ102-splice-failure-photo]].",
];

const civ102ReflectionParagraphs = [
  "CIV102 sharpened my view of engineering design by showing that the best bridge was not the one with the highest predicted capacity, but the one that remained structurally credible, materially efficient, and buildable under real fabrication limits.",
  "This project also demosntrated my trust in engineering designs that can be analyzed clearly, built consistently, and still perform without depending on near-perfect execution [[cite:civ102-design-report]].",
];

const civ102CtmfSynthesis: ProjectCtmfSynthesis = {
  title: "How The CTMFs Changed This Project",
  intro:
    "CIV102 improved through a sequence of CTMFs that each changed the bridge in a different way: one clarified what kind of bridge was worth building, one directed iteration toward the current governing weakness, and one made convergence across revisions easier to justify.",

  entries: [
    {
      title: "Challenge assumptions changed what kind of bridge was worth optimizing",
      body:
        "This CTMF helped us reject complexity that was not earning its place. Choosing the pi-beam and later removing the bottom flange both came from asking whether added geometry was improving structural performance enough to justify the material, fitting, and fabrication cost it introduced.",
    },
    {
      title: "Calculations and simulation changed how the bridge evolved",
      body:
        "The calculations turned each revision into a response to the current governing weakness rather than a speculative change in search of higher strength. That gave the bridge a more disciplined path of development, where each iteration followed from the structural limit exposed by the previous one.",
    },
    {
      title: "The six Pugh charts changed how convergence was justified",
      body:
        "The six comparison charts made convergence traceable by showing what each revision improved, what weakness governed next, and where strength had to be traded for buildability. Their limit appeared in final testing, when splice sensitivity and fabrication error governed failure more strongly than the analytical comparisons had captured.",
    },
  ],

  closing:
    "Together, these CTMFs showed me that strong structural reasoning is not just about making a bridge stronger on paper. CIV102 made clear that framing, iteration, and convergence can all be logical while still missing the local fabrication condition that fails first.",
};

const civ102TeamCredit =
  "CIV102 was completed collaboratively, but the project work was not evenly identical across every task. The contribution split below reflects the clearest ownership in code, calculations, figures, analysis, and documentation, while fabrication remained shared across the full bridge team.";

const civ102TeamContributions = [
  {
    name: "William Xu",
    role: "Developed the code used in the bridge-design workflow and iteration process.",
  },
  {
    name: "Michael (Mao) Li",
    role: "Developed code and completed the hand calculations supporting the bridge analysis.",
  },
  {
    name: "Beckett Deschamps",
    role: "Developed the figures and analyzed the resulting bridge data.",
  },
  {
    name: "Jeffrey Hu",
    role: "Handled documentation work and contributed code.",
  },
];

const civ102FabricationCredit =
  "Everyone helped build the bridge, including outlining, cutting, gluing, and finishing during construction.";

const civ102Figures: Record<string, PraxisIFigure> = {
  bridge: {
    refKey: "01",
    src: "/context-evidence/raw/civ102-p3-img2.png",
    alt: "Built CIV102 bridge on a worktable before testing.",
    caption: "Built bridge photographed after fabrication. This is the physical object the analysis was trying to describe.",
    label: "Fig. 01",
    imageClassName: "object-cover",
  },
  crossSection: {
    refKey: "02",
    src: "/api/images/civ102-cross-section",
    alt: "Photo of the final CIV102 bridge cross-section showing the top flange, web spacing, and overall section depth.",
    caption: "Photo of the final bridge cross-section showing the top flange, web spacing, and overall section depth.",
    label: "Fig. 02",
    imageClassName: "object-contain bg-white p-3",
  },
  loadEnvelope: {
    refKey: "04",
    src: "/context-evidence/raw/civ102-p7-img1.png",
    alt: "Shear-force and bending-moment envelopes for the CIV102 bridge load case.",
    caption: "Shear-force and bending-moment envelopes used to locate the critical loading logic along the span.",
    label: "Fig. 04",
    imageClassName: "object-contain bg-white p-3",
  },
  loadingConfiguration: {
    refKey: "03",
    src: "/api/images/civ102-loading-configuration",
    alt: "Train dimensions and loading schematic showing the three-carriage 400 N train, axle spacing, and left-to-right movement across the bridge.",
    caption: "Train dimensions and loading schematic showing the three-carriage 400 N train, axle spacing, and left-to-right movement that governed the bridge loading constraints.",
    label: "Fig. 03",
    imageClassName: "object-contain bg-white p-3",
  },
  designZero: {
    refKey: "07",
    src: "/context-evidence/raw/civ102-p5-img1.png",
    alt: "Design 0 factor-of-safety output showing thin-plate buckling case 1 governing at 0.597.",
    caption: "Design 0 factor-of-safety output. Thin-plate buckling case 1 governed early and made the first real weakness visible.",
    label: "Fig. 07",
    imageClassName: "object-contain bg-[#0b131d] p-3",
  },
  diaphragm: {
    refKey: "05",
    src: "/context-evidence/raw/civ102-p19-img1.png",
    alt: "Final bridge cross-section and diaphragm-location diagram.",
    caption: "Final cross-section and diaphragm placement diagram for the selected bridge configuration.",
    label: "Fig. 05",
    imageClassName: "object-contain bg-white p-3",
  },
  buildReview: {
    kind: "video",
    refKey: "06",
    src: "/api/videos/civ102-build-review",
    alt: "CIV102 build review video showing the completed bridge in hand and from multiple viewing angles.",
    caption: "Build review video of the completed bridge.",
    label: "Fig. 06",
    imageClassName: "object-contain bg-white p-3",
  },
  layout: {
    refKey: "08",
    src: "/context-evidence/raw/civ102-p3-img1.png",
    alt: "Matboard layout showing how the bridge parts fit onto a single sheet.",
    caption: "Matboard layout showing how the bridge parts were nested onto a single sheet, making buildability a real design constraint.",
    label: "Fig. 08",
    imageClassName: "object-contain bg-white p-3",
  },
  splice: {
    refKey: "09",
    src: "/context-evidence/raw/civ102-splice-failure.jpg",
    alt: "Bridge during testing with the front splice circled where failure initiated.",
    caption: "Testing photo with the front splice circled. This was the local detail that overruled the predicted global failure mode.",
    label: "Fig. 09",
    imageClassName: "object-cover",
  },
  failure: {
    refKey: "10",
    src: "/context-evidence/raw/civ102-failure.png",
    alt: "Bridge collapsed during testing under moving-train loading.",
    caption: "Image of Bifrost being crushed under the force of 580 N.",
    label: "Fig. 10",
    imageClassName: "object-cover",
  },
  timeLog: {
    refKey: "11",
    src: "/api/images/civ102-time-log",
    alt: "CIV102 team time log showing task-by-task hours for William, Michael, Beckett, and Jeffrey across design calculations, drawings, construction, and report work.",
    caption: "Team time log showing how effort was distributed across design calculations, drawings, construction, and report work. It supports the contribution split by making the labor record visible rather than implied.",
    label: "Fig. 11",
    imageClassName: "object-contain bg-white p-3",
  },
};

const civ102CtmfLessons: Record<string, string> = {
  "challenge-assumptions":
    "Kept the bridge from becoming a blind optimization exercise by questioning form complexity early and splice confidence late.",
  "calculations-simulation":
    "Turned bridge iteration into a structured search through height, flange, web, diaphragm, and fitting tradeoffs, while the test later exposed what the model still missed.",
  "pugh-chart-civ102":
    "Showed how six explicit comparison charts narrowed the bridge by judging strength, buildability, and fabrication credibility together instead of by intuition.",
};

const civ102Annotations: ProjectAnnotation[] = [
  {
    id: "civ102-form",
    kicker: "Engineering Decision",
    title: "Simple geometry was the stronger choice.",
    body: "The pi-beam form was not a stylistic preference. It was the section our team could analyze, fit, and build with enough consistency that the calculations still meant something.",
    accent: "#ffd23c",
    depth: "back",
    positionClassName: "left-[2.25%] top-[10rem] hidden xl:block",
    rotationClassName: "-rotate-[3deg]",
  },
  {
    id: "civ102-iteration",
    kicker: "Iteration Logic",
    title: "Each redesign answered a governing weakness.",
    body: "The bridge evolved by following whichever failure mode controlled at the moment: early buckling, then compression, then manufacturability, and finally splice sensitivity.",
    accent: "#ff8f66",
    depth: "front",
    positionClassName: "right-[3%] top-[20rem] hidden 2xl:block",
    rotationClassName: "rotate-[4deg]",
  },
  {
    id: "civ102-rebuttal",
    kicker: "Reality Check",
    title: "580 N changed the meaning of the project.",
    body: "The test did not merely show that the bridge was weaker than predicted. It showed that poor fabrication had become the real governing condition.",
    accent: "#31d7c4",
    depth: "back",
    positionClassName: "left-[3.5%] bottom-[14rem] hidden xl:block",
    rotationClassName: "rotate-[2deg]",
  },
  {
    id: "civ102-future",
    kicker: "Design Risk",
    title: "Splice reliability should have been primary.",
    body: "The bridge was analytically strong, but one sensitive splice detail overruled the global model. That local vulnerability needed to be treated as structural, not secondary.",
    accent: "#8ed1ff",
    depth: "front",
    positionClassName: "right-[4.5%] bottom-[9rem] hidden lg:block",
    rotationClassName: "-rotate-[4deg]",
  },
];

const praxisIIOverviewParagraphs = [
  "Cold-weather amateur astronomy was a strong design opportunity because winter extends the observing window at exactly the time when telescope use becomes hardest to sustain, giving RASC centres longer nights for star parties and overnight sessions while forcing astronomers to work through January conditions near -6.7°C; in Toronto, the roughly 6.5 extra hours of darkness around the December solstice therefore arrived with the same seasonal cold that made precise operation harder on the hands [[cite:toronto-sun-december-timeanddate,toronto-climate-normals-1991-2020]].",
  "What made the opportunity worth pursuing was not cold in general, but the specific conflict it created during use, since amateur astronomers often had to remove their gloves to focus, swap eyepieces, turn small controls, or recover dropped parts, exposing a direct gap between the fine manual precision telescope tasks demanded and what cold or gloved hands could actually do [[cite:praxis2-rfp]].",
];

const praxisIIClaims = [
  "The project became stronger once it stopped treating winter astronomy as a warmth problem and started treating it as a manipulability problem [[cite:praxis2-rfp]].",
  "The first testing procedure was not trustworthy enough, so the evidence model had to be redesigned before convergence meant anything [[cite:praxis2-showcase-doc]].",
  "The final glove mattered because it accepted the warmth-versus-precision tradeoff through controlled modes instead of pretending one state could satisfy every task [[cite:praxis2-showcase-doc]].",
];

const praxisIIObjectivesParagraphs = [
  "The original Praxis II Request For Proposals document framed the opportunity broadly as improving cold-weather telescope operation, though stakeholder conversations and direct observation narrowed the governing issue much more sharply [[cite:praxis2-rfp]]. The recurring failure was not cold in the abstract, but the loss of fine manual control, since cold hands and bulky gloves interfered with focusing, small adjustments, and accessory handling in low light.",
  "That reframing left two main directions: change the telescope through attachments, or preserve the user\'s dexterity directly. The second path proved more credible because observers still needed precise finger control, telescope setups varied too much for a single redesign, and the solution had to work in cold, wet, low-light conditions [[cite:praxis2-rfp,praxis2-one-pager]].",
];

const praxisIIStakeholders = [
  {
    title: "Active RASC observers",
    body: "Needed a solution that preserved fine control during focusing, accessory changes, and small adjustments in real winter observing sessions.",
  },
  {
    title: "Equipment diversity across the RASC community",
    body: "Commercial and DIY telescope variation made permanent telescope-specific redesign less inclusive and less generalizable across the RASC community.",
  },
  {
    title: "Adjacent cold-weather dexterity users",
    body: "Food delivery drivers, hunters, sailors, and similar users reinforced that the underlying challenge was broader than astronomy alone: some cold-weather tasks still demand fine control, quick access, and reliable hand function outdoors.",
  },
];

const praxisIIRequirementsParagraphs = [
  "By the final showcase stage, the requirements worked best as a compact statement of what the glove had to preserve in real winter use, since the project was never just about adding heat and only held together as a solution when dexterity remained intact without bulk, fragility, or setup burden quietly breaking it [[cite:praxis2-showcase-doc]].",
  "At the project-page level, the important structure is the governing constraint groups rather than every coded requirement, because criteria tied to telescope modification fell away once the project converged on preserving user dexterity directly rather than altering the telescope itself [[cite:praxis2-one-pager,praxis2-showcase-doc]].",
];

const praxisIIRequirements = [
  "Functionality: preserve enough general and task-specific dexterity that fine telescope adjustments remain possible in winter conditions.",
  "Safety and comfort: provide useful warmth without creating unsafe contact temperatures, harsh thermal gradients, or an uncomfortable hand state.",
  "Reliability: keep the glove system functional under repeated outdoor use, including moisture exposure, wire durability, and stable electrical performance.",
  "Portability: remain compact and low-burden enough that carrying, setup, and mode-switching do not undermine real observing use.",
  "Astronomy compatibility: work with existing telescope setups and observing routines without requiring telescope-specific attachments or redesign.",
];

const praxisIIFigures: Record<string, PraxisIFigure> = {
  problem: {
    refKey: "01",
    src: "/context-evidence/raw/praxis2-fig1-problem.png",
    alt: "Former RASC member removing a glove to make a telescope adjustment.",
    caption: "Former RASC member removing a glove to make a telescope adjustment. This behavior grounded the project in a dexterity failure rather than a generic comfort complaint.",
    label: "Fig. 01",
    imageClassName: "object-cover",
  },
  workflow: {
    refKey: "02",
    src: "/context-evidence/raw/praxis2-fig2-workflow.png",
    alt: "Workflow diagram showing dexterity-sensitive failure points during telescope use.",
    caption: "Workflow diagram highlighting where cold hands and low-light conditions turn small astronomy tasks into repeated failure points and rework.",
    label: "Fig. 02",
    imageClassName: "object-contain bg-white p-3",
  },
  framing: {
    refKey: "03",
    src: "/context-evidence/raw/praxis2-fig3-framing.png",
    alt: "Framing diagram comparing redesigning the telescope with preserving user dexterity.",
    caption: "Early framing diagram contrasting the two main paths: redesign the telescope interface or preserve the user's dexterity directly.",
    label: "Fig. 03",
    imageClassName: "object-contain bg-white p-3",
  },
  stakeholderMap: {
    refKey: "04",
    src: "/context-evidence/raw/praxis2-fig4-stakeholders.png",
    alt: "Stakeholder map for the Praxis II winter astronomy project.",
    caption: "Stakeholder map showing that the project was constrained not only by users, but also by community fit, equipment diversity, and observing conditions.",
    label: "Fig. 04",
    imageClassName: "object-contain bg-white p-3",
  },
  onePagerFront: {
    refKey: "05",
    src: "/api/images/praxis2-one-pager/front",
    alt: "Front side of the Praxis II one-pager summarizing requirements, evaluation criteria, and project framing.",
    caption: "One-pager front side. This fits the Requirements and Evaluation Criteria section better because it summarizes the project framing and requirement logic rather than jumping ahead to later testing results.",
    label: "Fig. 05A",
    imageClassName: "object-contain bg-white p-3",
  },
  onePagerBack: {
    refKey: "05b",
    src: "/api/images/praxis2-one-pager/back",
    alt: "Back side of the Praxis II one-pager summarizing requirements, evaluation criteria, and solution constraints.",
    caption: "One-pager back side. Read with Fig. 05A, it keeps the section focused on the design brief, constraints, and evaluation logic rather than the final showcase poster.",
    label: "Fig. 05B",
    imageClassName: "object-contain bg-white p-3",
  },
  modes: {
    refKey: "06",
    src: "/context-evidence/raw/praxis2-high-low-modes.png",
    alt: "Diagram of the Praxis II glove in high- and low-dexterity modes.",
    caption: "High- and low-dexterity glove modes. The final design accepted controlled switching between protection and precision instead of forcing one state to do everything.",
    label: "Fig. 06",
    imageClassName: "object-contain bg-white p-3",
  },
  schematic: {
    refKey: "07",
    src: "/context-evidence/raw/praxis2-internal-schematic.png",
    alt: "Internal schematic of the GRIPPy glove concept showing the heating layout and major components.",
    caption: "Internal schematic of the final glove, showing finger-focused heating, routing logic, and the system architecture behind the final concept.",
    label: "Fig. 07",
    imageClassName: "object-contain bg-white p-3",
  },
  folding: {
    refKey: "10",
    src: "/context-evidence/raw/praxis2-folding-configuration.webp",
    alt: "Folding configuration of the Praxis II physical prototype.",
    caption: "Folding configuration of the physical prototype. The convertible structure became necessary once validation showed that some astronomy tasks still required a higher-dexterity mode.",
    label: "Fig. 10",
    imageClassName: "object-contain bg-white p-3",
  },
  temp: {
    refKey: "11",
    src: "/context-evidence/raw/praxis2-graph-temp.png",
    alt: "Temperature-loss comparison graph used in Praxis II testing.",
    caption: "Temperature testing supported the glove's thermal logic, but the project only became trustworthy once thermal and dexterity questions were separated and then recombined carefully.",
    label: "Fig. 11",
    imageClassName: "object-contain bg-white p-3",
  },
  dexterity: {
    refKey: "12",
    src: "/context-evidence/raw/praxis2-graph-dexterity.png",
    alt: "Dexterity versus temperature graph from Praxis II testing.",
    caption: "Dexterity versus temperature evidence showed why preserving usable fingertip performance mattered more than solving cold discomfort abstractly.",
    label: "Fig. 12",
    imageClassName: "object-contain bg-white p-3",
  },
  wireOptimization: {
    refKey: "09",
    src: "/context-evidence/raw/praxis2-wire-optimization.webp",
    alt: "Optimization study relating wire length to generated heat in the Praxis II glove system.",
    caption: "Wire-length optimization study. Limited electrical power made localized finger heating more defensible than trying to heat the entire glove uniformly.",
    label: "Fig. 09",
    imageClassName: "object-contain bg-white p-3",
  },
};

const praxisIIFinalSolutionParagraphs = [
  "The final engineering solution was a convertible heated glove system designed around the fingers rather than the hand as a single thermal zone. Resistive carbon-fiber heating was concentrated where dexterity loss mattered most, because the project\'s calculations and prototype testing showed that limited electrical power had to be used selectively rather than distributed everywhere. The battery was moved off the hand and onto a wrist-mounted support so the system would not reduce precision through added hand weight [[cite:praxis2-showcase-doc,praxis2-final-poster]].",
  "The glove also became explicitly multi-modal, using a flip-back outer section to let the user shift between a protected low-dexterity mode and a higher-dexterity mode for fine telescope tasks, a move supported by secondary validation with food delivery riders on electric bikes whose winter gloves reflected the same underlying need to alternate between thermal protection and precise hand use outdoors. The project improved once it stopped treating one glove state as sufficient for every astronomy action and instead built controlled switching between warmth and precision into the solution itself [[cite:praxis2-showcase-doc,praxis2-discord-record]].",
];

const praxisIISelectionParagraphs = [
  "The final concept was selected because it responded most directly to the reframed issue while respecting community-fit constraints. Early on, our team explored environment systems, software or error-mitigation ideas, telescope attachments, knob-turner concepts, and glove-based concepts. Several of those weakened once portability, setup burden, and telescope diversity were treated as real constraints rather than decorative considerations. A solution that depended on one telescope geometry or added too much interaction burden stopped being persuasive even if it looked clever in isolation [[cite:praxis2-beta-release,praxis2-showcase-doc]].",
  "The strongest improvement made was to make convergence have a clearer logic. Stage 1 revealed that the original cold-plunge procedure could not hold the cold condition long enough to generate trustworthy evidence, so the testing procedure itself had to change. Later observation and validation then weakened the knob-turner more decisively: only about 27.3% of observed actions were rotational, telescope operation involved many non-rotational hand tasks, and a turning aid added its own equip/unequip burden. The glove remained strongest because it preserved dexterity directly, stayed more generalizable across telescope setups, and later evolved into a convertible design that matched the real warmth-versus-precision tradeoff more honestly [[cite:praxis2-showcase-doc,praxis2-discord-record]].",
];

const praxisIISelectionMetrics = [
  {
    metric: "Stage 1 cold condition",
    value: "1 to 3 s",
    note: "The cold-plunge effect disappeared too quickly, so the first test procedure could not support trustworthy convergence.",
  },
  {
    metric: "Observed rotational actions",
    value: "27.3%",
    note: "Workflow observation showed that telescope use was not mainly a knob-turning problem, which made the knob-turner path much less convincing.",
  },
  {
    metric: "Final operating states",
    value: "2 modes",
    note: "The glove kept both a protected mode and a higher-dexterity mode because one state could not honestly satisfy every task.",
  },
  {
    metric: "Heating strategy",
    value: "Finger-focused",
    note: "Voltage limits made localized heating more defensible than trying to heat the whole glove uniformly.",
  },
  {
    metric: "Battery placement",
    value: "Wrist-mounted",
    note: "Moving mass off the hand preserved dexterity instead of quietly burdening the user with the system itself.",
  },
  {
    metric: "Main framing paths",
    value: "2 directions",
    note: "The project explicitly compared redesigning the telescope interface with preserving user dexterity directly before converging on the latter.",
  },
  {
    metric: "Rejected aid",
    value: "Knob-turner dropped",
    note: "Observation, testing, and workflow burden showed that a turning aid was not generalizable enough and often added burden instead of removing it.",
  },
];

const praxisIIDecisions = [
  {
    title: "Rebuild the testing procedure before trusting convergence",
    body:
      "The first cold-plunge setup looked rigorous, though it could only produce a few seconds of meaningful impairment before the hands began to recover, which meant the procedure was too weak to support honest comparison between concepts. The project improved once Stage 2 separated dexterity and thermal questions before bringing them back together later, because convergence only became defensible after the evidence model itself had been rebuilt [[cite:praxis2-showcase-doc]].",
  },
  {
    title: "Use observed workflow to eliminate the knob-turner path",
    body:
      "The knob-turner weakened once the team learned more about telescope use itself, not simply because the glove direction improved. Observation showed that only about 27.3% of actions were rotational, while many of the tasks that actually governed use depended on broader hand dexterity, and the turning aid introduced its own burden of attachment, removal, and telescope-specific fit. The project therefore shifted away from redesigning one motion and toward preserving hand capability across the larger workflow [[cite:praxis2-showcase-doc]].",
  },
  {
    title: "Treat controlled switching between warmth and precision as part of the solution",
    body:
      "The final glove became stronger once the team stopped acting as though glove removal had to be eliminated completely and instead treated the warmth-versus-precision tradeoff as a real condition of use that had to be managed directly. The multi-mode glove was more defensible for that reason, since finger-focused heating, wrist battery placement, and the flip-back outer layer all supported controlled transitions between protection and fingertip access rather than pretending one glove state could serve every astronomy action equally well.",
  },
];

const praxisIIProcessParagraphs = [
  "Praxis II began with a broad winter-astronomy usability frame and expanded across multiple intervention levels, which meant the early project was still unstable in both problem definition and solution space. It only improved once framing and testing were reopened together, because stakeholder evidence narrowed the issue toward preserving dexterity directly while Stage 1 showed that the cold-plunge procedure was too weak to compare concepts fairly; from there, clearer requirements and testing logic made it possible to reject the knob-turner more honestly, justify finger-focused heating, and converge on the final multi-mode glove [[cite:praxis2-beta-release,praxis2-showcase-doc]].",
];

const praxisIIPhases: PraxisIPhase[] = [
  {
    id: "01",
    title: "Broad winter-use framing",
    body: "The project began with a broad winter astronomy opportunity that still allowed multiple interpretations of what actually needed to be fixed.",
  },
  {
    id: "02",
    title: "Competing intervention paths",
    body: "Environment systems, software ideas, telescope attachments, knob-turners, and glove concepts were all explored before workflow evidence and community fit narrowed the field.",
  },
  {
    id: "03",
    title: "Testing procedure reopened",
    body: "The first cold-plunge setup failed to hold the key condition long enough, so the project had to rebuild its testing logic before concept comparisons could be trusted.",
  },
  {
    id: "04",
    title: "Convergence on the multi-mode glove",
    body: "The final concept emerged after staged testing justified finger-focused heating, weakened the knob-turner path, and showed that no single glove state could honestly satisfy every telescope task.",
  },
];

const praxisIILearningParagraphs = [
  "Praxis II made clear that winter telescope use does not fail simply because users are cold, but because cold and bulky handwear begin to erode the fine manual control that the workflow repeatedly demands, so the project improved only once it treated manipulability rather than warmth as the real quantity to protect. From that point on, the strongest design decisions were the ones that preserved fingertip performance directly instead of responding to cold at the level of a broad, less useful symptom.",
  "The project also showed that poor testing logic can make a design process look more certain than it actually is, because the original cold-plunge method produced only brief impairment and therefore could not support fair comparison between concepts even though it appeared rigorous on the surface. Once that weakness was treated as a real engineering problem, and not just an inconvenience in the procedure, the team could separate thermal and dexterity questions, rebuild the evidence model, and defend convergence on stronger ground.",
];

const praxisIIReflectionParagraphs = [
  "Praxis II sharpened my view of design rigor by showing that rigor is useful only when the scope, criteria, and testing logic remain answerable to evidence. Early in the project, detailed objectives and narrow expectations created structure before the problem had been understood well enough, so what looked rigorous at first was sometimes narrowing the project too soon.",
	"The project also clarified a recurring bias in my own practice: I am more comfortable tightening a problem than staying with ambiguity, which helps once the logic is ready, though it can also make early structure feel more trustworthy than it is. Praxis II made that risk difficult to ignore, because the project only improved after both the framing and the testing procedure were reopened, and that made the lesson more specific than “stay flexible”: good engineering depends on recognizing when the problem has narrowed too early, when the evidence is too weak to support convergence, and when both have to be rebuilt before a concept deserves trust.",
];

const praxisIICtmfSynthesis: ProjectCtmfSynthesis = {
	title: "How The CTMFs Changed This Project",
	intro:
		"Praxis II improved once its main CTMFs stopped reading as separate course exercises and began reshaping the project in sequence, with one reframing the problem around the actual use failure, one rebuilding the evidence model, and one expanding the early design space without being mistaken for proof of the final concept.",
	entries: [
		{
			title: "Root cause analysis changed what the project was actually about",
			body:
				"Root cause analysis shifted the project away from winter discomfort in general and toward the actual breakdown in use: the loss of dexterity during fine telescope tasks. That reframing clarified the real intervention paths from the start.",
		},
		{
			title: "Verification and validation changed which evidence could be trusted",
			body:
				"Verification and validation exposed that the first cold-plunge setup was too weak to support serious comparison. Rebuilding the testing logic made later convergence more credible and weakened the knob-turner on firmer grounds.",
		},
		{
			title: "Biomimicry changed the early divergence logic, not the final proof",
			body:
				"Biomimicry widened the early concept space by introducing ideas like selective insulation and mode-based dexterity instead of defaulting immediately to a standard heated glove. Its value was in generating directions, not proving which one should win.",
		},
	],
	closing:
		"Together, these CTMFs made the project stronger by correcting the problem definition and the evidence before the final concept was trusted.",
};

const ProjectCtmfSynthesisSection = ({
	synthesis,
	accentClassName,
}: {
	synthesis: ProjectCtmfSynthesis;
	accentClassName: string;
}) => {
	return (
		<section className="mt-6">
			<article className={`${lightPanelClass} p-6 md:p-8`}>
				<p
					className={`text-[0.68rem] uppercase tracking-[0.3em] ${accentClassName}`}
					style={{ fontFamily: "var(--font-vercetti)" }}>
					{synthesis.title}
				</p>
				<p
					className="mt-4 max-w-3xl text-sm leading-7 text-slate-900/78"
					style={{ fontFamily: "var(--font-vercetti)" }}>
					{synthesis.intro}
				</p>

				<div className="mt-6 grid gap-4 xl:grid-cols-3">
					{synthesis.entries.map((entry) => (
						<div
							key={entry.title}
							className="rounded-[1.35rem] border border-slate-900/10 bg-white/70 px-5 py-5">
							<h3
								className="text-[1.35rem] leading-tight text-slate-950"
								style={{ fontFamily: "var(--font-soria)" }}>
								{entry.title}
							</h3>
							<p
								className="mt-4 text-sm leading-7 text-slate-900/72"
								style={{ fontFamily: "var(--font-vercetti)" }}>
								{entry.body}
							</p>
						</div>
					))}
				</div>

				<p
					className="mt-6 max-w-4xl text-sm leading-7 text-slate-900/78"
					style={{ fontFamily: "var(--font-vercetti)" }}>
					{synthesis.closing}
				</p>
			</article>
		</section>
	);
};

const praxisIISkills = [
  "The core engineering problem was loss of manipulability during telescope use, not winter discomfort in general.",
  "Testing logic matters as much as concept quality, because weak evidence can make convergence seem more justified than it is.",
  "Workflow evidence can weaken a concept that only solves one narrow part of a larger task sequence.",
  "A design often becomes stronger when it manages a real tradeoff directly instead of pretending it can eliminate it.",
];

const praxisIITeamCredit =
  "Praxis II was completed collaboratively within the course team, with each member's responsibilities are outlined below:";

const praxisIITeam = [
  {
    name: "William Xu",
    role: "Developed the prototype and led the root cause analysis and external validation with food delivery workers.",
  },
  {
    name: "Mike Liu",
    role: "Led design research, optimized the circuit, and contributed to testing.",
  },
  {
    name: "Mikael Sharify-Funk",
    role: "Contributed to prototype testing and developed the comparison matrices and divergence-convergence process.",
  },
  {
    name: "Alex Zhu",
    role: "Contributed to prototype development and poster production.",
  },
];

const praxisIICtmfLessons: Record<string, string> = {
  "root-cause-analysis":
    "Owns the first major turn: the problem was not generic cold discomfort, but the dexterity-manipulability mismatch that actually governed astronomy use.",
  "verification-validation":
    "Owns the second major turn: the first test procedure was too weak, so staged validation had to rebuild the evidence before convergence could be trusted.",
  biomimicry:
    "Owns the early thermal-logic prompt: it helped open finger-focused heating ideas, but the final glove still had to be justified by testing, constraints, and community fit.",
};

const ProjectAnnotations = ({ notes }: { notes: ProjectAnnotation[] }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {notes.map((note) => (
      <aside
        key={note.id}
        className={`project-annotation-card ${note.depth === "front" ? "project-annotation-front" : "project-annotation-back"} ${note.positionClassName} ${note.rotationClassName}`}>
        <span
          className="project-annotation-accent"
          style={{ backgroundColor: note.accent }}
        />
        <p
          className="project-annotation-kicker"
          style={{ fontFamily: "var(--font-vercetti)" }}>
          {note.kicker}
        </p>
        <h3
          className="project-annotation-title"
          style={{ fontFamily: "var(--font-vercetti)" }}>
          {note.title}
        </h3>
        <p
          className="project-annotation-body"
          style={{ fontFamily: "var(--font-vercetti)" }}>
          {note.body}
        </p>
      </aside>
    ))}
  </div>
);

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
          <RememberedBackLink
            fallbackHref="/?portal=work"
            fallbackLabel="Back to Timeline"
            className="neo-chip bg-[#efe7d6] px-4 py-2 text-black hover:-translate-y-1 hover:text-black"
          />
          <div className="neo-chip -rotate-2 bg-[#ffd23c] px-4 py-2">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-black md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
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
              <span
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Evidence-led case study
              </span>
            </div>

            <p
              className="mb-3 text-[0.72rem] uppercase tracking-[0.32em] text-sky-200/80"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Project Overview
            </p>
            <h1
              className="max-w-4xl text-[2.9rem] leading-[0.94] text-white md:text-[4.4rem] xl:text-[5.4rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              Praxis I - {detail.title}
            </h1>

            <div className="mt-8 grid gap-5">
              {praxisIOverviewParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-4xl text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            {[praxisIFigures.testing, praxisIFigures.slider].map((figure) => (
              <article
                key={figure.label}
                id={getFigureAnchorId("praxis-i", figure.refKey!)}
                className={`${lightPanelClass} scroll-mt-28 overflow-hidden p-4`}>
                <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                </div>
                <div className="overflow-hidden rounded-[1.45rem] border border-slate-900/10 bg-white">
                  <div className="relative h-[18rem] w-full">
                    {renderProjectFigureMedia(figure, `${figure.label} ${figure.alt}`)}
                  </div>
                </div>
                <p
                  className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {figure.caption}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <article className={`${lightPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Objectives and Stakeholders
            </p>
            <div className="mt-5 grid gap-4">
              {praxisIObjectivesParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-900/82"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
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
                    <CitationText text={stakeholder.body} />
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Requirements and Evaluation Criteria
            </p>
            <div className="mt-5 grid gap-4">
              {praxisIRequirementsParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {praxisIRequirements.map((requirement) => (
                <div
                  key={requirement}
                  className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {requirement}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <article className={`${lightPanelClass} overflow-hidden p-4`}>
            <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Final Solution
                </p>
                <h2
                  className="mt-2 text-3xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Slider-based silent can
                </h2>
              </div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {praxisIFigures.sliderAnimation.label}
              </p>
            </div>

            <div
              id={getFigureAnchorId("praxis-i", praxisIFigures.sliderAnimation.refKey!)}
              className="scroll-mt-28 overflow-hidden rounded-[1.45rem] border border-slate-900/10 bg-white">
              <div className="relative h-[24rem] w-full">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={praxisIFigures.sliderAnimation.alt}
                  className="h-full w-full object-contain p-4">
                  <source src={praxisIFigures.sliderAnimation.src as string} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="mt-5 grid gap-4 px-2">
              {praxisIFinalSolutionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-900/82"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  Why This Solution Was Selected
                </p>
                <h2
                  className="mt-2 text-3xl text-white"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Strongest overall concept after reframing
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {praxisISelectionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <FigureReferenceText text={paragraph} refs={praxisIFigureReferences} />
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {praxisIMetrics.map((row) => (
                <article key={row.metric} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-sky-200/70"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {row.metric}
                  </p>
                  <div className="mt-3 text-[1.7rem] leading-none text-cyan-200" style={{ fontFamily: "var(--font-soria)" }}>
                    {row.slider}
                  </div>
                  <p
                    className="mt-3 text-sm leading-7 text-slate-300"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {row.comparison}
                  </p>
                  <p
                    className="mt-2 text-sm leading-7 text-slate-200"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {row.note}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              {[praxisIFigures.acoustic, praxisIFigures.pressure, praxisIFigures.co2].map((figure, index) => (
                <article
                  key={figure.label}
                  id={getFigureAnchorId("praxis-i", figure.refKey!)}
                  className="scroll-mt-28 rounded-[1.35rem] border border-white/10 bg-[#101d2b] p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.28em] text-sky-200/70"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {figure.label}
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white">
                    <div className={`relative w-full ${index === 0 ? "h-[16rem]" : "h-[20rem] md:h-[24rem]"}`}>
                      <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                    </div>
                  </div>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-300"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.caption}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className={`${darkPanelClass} mt-6 p-6 md:p-8`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Main Engineering Decisions and What Influenced Them
              </p>
              <h2
                className="mt-3 text-4xl text-white"
                style={{ fontFamily: "var(--font-soria)" }}>
                Reframing mattered more than polishing
              </h2>
            </div>
            <p
              className="max-w-xl text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisIDecisionsIntro}
            </p>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {praxisIDecisions.map((decision, index) => (
              <article key={decision.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
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
                  <CitationText text={decision.body} />
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <article
              id={getFigureAnchorId("praxis-i", praxisIFigures.morph.refKey!)}
              className="scroll-mt-28 rounded-[1.6rem] border border-white/10 bg-[#101d2b] p-4">
              <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {praxisIFigures.morph.label}
                  </p>
                  <h3
                    className="mt-2 text-3xl text-white"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    Early concept spread under the original frame
                  </h3>
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white">
                <div className="relative h-[25rem] w-full">
                  <Image src={praxisIFigures.morph.src} alt={praxisIFigures.morph.alt} fill className={praxisIFigures.morph.imageClassName} />
                </div>
              </div>
              <p
                className="mt-4 px-2 text-sm leading-7 text-slate-300"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {praxisIFigures.morph.caption}
              </p>
            </article>

            <div className="grid gap-4">
              {[praxisIFigures.needle, praxisIFigures.water, praxisIFigures.rubber].map((figure) => (
                <article
                  key={figure.label}
                  id={getFigureAnchorId("praxis-i", figure.refKey!)}
                  className="scroll-mt-28 rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.28em] text-sky-200/70"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {figure.label}
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white">
                    <div className="relative h-[12rem] w-full">
                      <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                    </div>
                  </div>
                  <p
                    className="mt-3 text-sm leading-7 text-slate-300"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    <CitationText text={figure.caption} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6">
          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Iterative Design Process
            </p>
            <div className="mt-5 grid gap-4">
              {praxisIProcessParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-900/82"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
              {praxisIPhases.map((phase) => (
                <article key={phase.id} className="rounded-[1.35rem] border border-slate-900/10 bg-white/75 p-4">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {phase.id}
                  </p>
                  <h3
                    className="mt-2 text-[1.55rem] text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    {phase.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-7 text-slate-900/78"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {phase.body}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              What I Learned Through the Process
            </p>
            <div className="mt-5 grid gap-4">
              {praxisILearningParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-900/82"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Self-Reflection
            </p>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              <div>
                <p
                  className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {praxisIFigures.anchor.label}
                </p>
                <div
                  id={getFigureAnchorId("praxis-i", praxisIFigures.anchor.refKey!)}
                  className="scroll-mt-28 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b131d]">
                  <div className="relative h-[23rem] w-full">
                    {renderProjectFigureMedia(
                      praxisIFigures.anchor,
                      `${praxisIFigures.anchor.label} ${praxisIFigures.anchor.alt}`,
                    )}
                  </div>
                </div>
                <p
                  className="mt-4 text-sm leading-7 text-slate-300"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {praxisIFigures.anchor.caption}
                </p>
              </div>

              <div>
                <p
                  className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {praxisIFigures.reflection.label}
                </p>
                <div
                  id={getFigureAnchorId("praxis-i", praxisIFigures.reflection.refKey!)}
                  className="scroll-mt-28 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white">
                  <div className="relative h-[23rem] w-full">
                    <Image
                      src={praxisIFigures.reflection.src}
                      alt={praxisIFigures.reflection.alt}
                      fill
                      sizes="(max-width: 1279px) 100vw, 42vw"
                      className={praxisIFigures.reflection.imageClassName}
                    />
                  </div>
                </div>
                <p
                  className="mt-4 text-sm leading-7 text-slate-300"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {praxisIFigures.reflection.caption}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {praxisIReflectionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>
          </article>
        </section>

        <ProjectCtmfSynthesisSection
          synthesis={praxisICtmfSynthesis}
          accentClassName="text-slate-700/60"
        />

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <article className={`${darkPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Team Credit
            </p>
            <p
              className="mt-4 text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisITeamCredit}
            </p>
            <div className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisITeam.map((member) => (
                <div
                  key={member.name}
                  className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-sm text-white">{member.name}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{member.role}</p>
                </div>
              ))}
            </div>
          </article>

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
              className="mt-4 max-w-3xl text-sm leading-7 text-slate-800/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The CTMF pages now function as extensions of the reframing story on this route. They show how stakeholder pressure became requirements, how divergence widened the mechanism space, and how convergence only became credible once the frame improved.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {praxisCtmfs.map((ctmf) => {
                const stageTheme = getFdcrStageTheme(ctmf.stageCode, ctmf.stage);

                return (
                  <RememberedLink
                    key={ctmf.slug}
                    href={`/ctmfs/${ctmf.slug}`}
                    returnHref={`/projects/${slug}`}
                    returnLabel="Back to Praxis I"
                    className="rounded-[1.45rem] border border-slate-900/10 bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white">
                    <span
                      className={`inline-flex px-3 py-2 text-[0.68rem] uppercase tracking-[0.28em] ${stageTheme.indicatorClassName}`}
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {getFdcrStageLabel(ctmf.stageCode ?? ctmf.stage.charAt(0), ctmf.stage)}
                    </span>
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
                );
              })}
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
      <ProjectAnnotations notes={civ102Annotations} />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-5 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b-[3px] border-black pb-6 md:mb-10">
          <RememberedBackLink
            fallbackHref="/?portal=work"
            fallbackLabel="Back to Timeline"
            className="neo-chip bg-[#efe7d6] px-4 py-2 text-black hover:-translate-y-1 hover:text-black"
          />
          <div className="neo-chip -rotate-2 bg-[#ffd23c] px-4 py-2">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-black md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
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
              <span
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Evidence-led case study
              </span>
            </div>

            <p
              className="mb-3 text-[0.72rem] uppercase tracking-[0.32em] text-amber-200/80"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Project Overview
            </p>
            <h1
              className="max-w-4xl text-[2.9rem] leading-[0.94] text-white md:text-[4.4rem] xl:text-[5.4rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              CIV102 - {detail.title}
            </h1>

            <div className="mt-8 grid gap-5">
              {civ102OverviewParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-4xl text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {civ102Claims.map((claim) => (
                <div
                  key={claim}
                  className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={claim} />
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            {[civ102Figures.bridge, civ102Figures.crossSection].map((figure) => (
              <article key={figure.label} className={`${lightPanelClass} overflow-hidden p-4`}>
                <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                </div>
                <div className="overflow-hidden rounded-[1.45rem] border border-slate-900/10 bg-white">
                  <div className="relative h-[18rem] w-full">
                    <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                  </div>
                </div>
                <p
                  className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {figure.caption}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <article className={`${lightPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Objectives and Stakeholders
            </p>
            <div className="mt-5 grid gap-4">
              {civ102ObjectivesParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-900/80"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
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
                    <CitationText text={stakeholder.body} />
                  </p>
                </div>
              ))}
            </div>

            <article className="mt-6 rounded-[1.25rem] border border-slate-900/10 bg-white/70 p-4">
              <p
                className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Figures.loadingConfiguration.label}
              </p>
              <div className="overflow-hidden rounded-[1.2rem] border border-slate-900/10 bg-white">
                <div className="relative h-[18rem] w-full">
                  <Image
                    src={civ102Figures.loadingConfiguration.src}
                    alt={civ102Figures.loadingConfiguration.alt}
                    fill
                    className={civ102Figures.loadingConfiguration.imageClassName}
                  />
                </div>
              </div>
              <p
                className="mt-4 text-sm leading-7 text-slate-900/76"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Figures.loadingConfiguration.caption}
              </p>
            </article>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Requirements and Evaluation Criteria
            </p>

            <div className="mt-5 grid gap-4">
              {civ102RequirementsParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <ul className="mt-6 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
              {civ102Requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100">
                  {requirement}
                </li>
              ))}
            </ul>
            <article className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-4 px-2 pt-2">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {civ102Figures.loadEnvelope.label}
                </p>
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white">
                <div className="relative h-[16rem] w-full">
                  <Image
                    src={civ102Figures.loadEnvelope.src}
                    alt={civ102Figures.loadEnvelope.alt}
                    fill
                    className={civ102Figures.loadEnvelope.imageClassName}
                  />
                </div>
              </div>
              <p
                className="mt-4 px-2 text-sm leading-7 text-slate-300"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Figures.loadEnvelope.caption}
              </p>
            </article>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
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
                  Structural clarity over geometric flourish
                </h2>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white">
                <div className="px-4 pt-4">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {civ102Figures.diaphragm.label}
                  </p>
                </div>
                <div className="relative h-[18rem] w-full">
                  <Image
                    src={civ102Figures.diaphragm.src}
                    alt={civ102Figures.diaphragm.alt}
                    fill
                    className={civ102Figures.diaphragm.imageClassName}
                  />
                </div>
              </div>
              <p
                className="mt-0 px-2 text-sm leading-7 text-slate-800/78"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Figures.diaphragm.caption}
              </p>

              <div className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white">
                <div className="px-4 pt-4">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {civ102Figures.buildReview.label}
                  </p>
                </div>
                <div className="relative h-[22rem] w-full">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={civ102Figures.buildReview.alt}
                    className="h-full w-full object-contain bg-white p-3">
                    <source src={civ102Figures.buildReview.src as string} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <p
                className="mt-0 px-2 text-sm leading-7 text-slate-800/78"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Figures.buildReview.caption}
              </p>
            </div>

            <div className="mt-4 grid gap-4 px-2">
              {civ102FinalSolutionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-800/78"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Final Performance Review
            </p>

            <div className="mt-5 grid gap-4">
              {civ102SelectionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
              <table className="min-w-full border-collapse" style={{ fontFamily: "var(--font-vercetti)" }}>
                <thead className="bg-white/8 text-left text-[0.68rem] uppercase tracking-[0.28em] text-amber-100/72">
                  <tr>
                    <th className="px-4 py-4">Measure</th>
                    <th className="px-4 py-4">Value</th>
                    <th className="px-4 py-4">What It Shows</th>
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
                {civ102DecisionsIntro}
              </h2>
            </div>
            <p
              className="max-w-xl text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The bridge improved once geometry, fitting, and fabrication were handled as one structural argument, since each constrained the others from the start.
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
                  <CitationText text={decision.body} />
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[civ102Figures.designZero, civ102Figures.layout].map((figure) => (
              <article key={figure.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-4 px-2 pt-2">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                </div>
                <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b131d]">
                  <div className="relative h-[16rem] w-full">
                    <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                  </div>
                </div>
                <p
                  className="mt-4 px-2 text-sm leading-7 text-slate-300"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {figure.caption}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Iterative Design Process
            </p>

            <div className="mt-5 grid gap-4">
              {civ102ProcessParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-900/80"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {civ102Phases.map((phase) => (
                <article key={phase.id} className="rounded-[1.25rem] border border-slate-900/10 bg-white/70 px-4 py-4">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-700/58"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {phase.id}
                  </p>
                  <h3
                    className="mt-2 text-xl text-slate-950"
                    style={{ fontFamily: "var(--font-soria)" }}>
                    {phase.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-7 text-slate-900/74"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {phase.body}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <article className={`${lightPanelClass} overflow-hidden p-4`}>
            <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  What I Learned Through the Process
                </p>
                <h2
                  className="mt-2 text-3xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  Structural optimization only works when the system still survives fabrication
                </h2>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white">
              <div className="px-4 pt-4">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {civ102Figures.splice.label}
                </p>
              </div>
              <div className="relative h-[18rem] w-full">
                <Image
                  src={civ102Figures.splice.src}
                  alt={civ102Figures.splice.alt}
                  fill
                  className={civ102Figures.splice.imageClassName}
                />
              </div>
            </div>
            <p
              className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {civ102Figures.splice.caption}
            </p>

            <div className="mt-4 grid gap-4 px-2">
              {civ102LearningParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-800/78"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Self-Reflection
            </p>

            <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white">
              <div className="px-4 pt-4">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-amber-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {civ102Figures.failure.label}
                </p>
              </div>
              <div className="relative h-[18rem] w-full">
                <Image
                  src={civ102Figures.failure.src}
                  alt={civ102Figures.failure.alt}
                  fill
                  className={civ102Figures.failure.imageClassName}
                />
              </div>
            </div>
            <p
              className="mt-4 text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {civ102Figures.failure.caption}
            </p>

            <div className="mt-6 grid gap-4">
              {civ102ReflectionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
              <p
                className="text-[0.68rem] uppercase tracking-[0.28em] text-amber-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                What This Clarified
              </p>
              <ul className="mt-3 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {civ102Skills.map((skill) => (
                  <li key={skill} className="text-sm leading-7 text-slate-300">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <ProjectCtmfSynthesisSection
          synthesis={civ102CtmfSynthesis}
          accentClassName="text-slate-700/60"
        />

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <article className={`${darkPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Team Credit
            </p>
            <p
              className="mt-4 text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {civ102TeamCredit}
            </p>

            <div className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
              {civ102TeamContributions.map((member) => (
                <div
                  key={member.name}
                  className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-sm text-white">{member.name}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{member.role}</p>
                </div>
              ))}
            </div>

            <p
              className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {civ102FabricationCredit}
            </p>
          </article>

          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connecting CTMFs With CIV102
            </p>
            <h2
              className="mt-3 text-4xl text-slate-950"
              style={{ fontFamily: "var(--font-soria)" }}>
              Three tools unpack the bridge in more detail
            </h2>
            <p
              className="mt-4 max-w-2xl text-sm leading-7 text-slate-800/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              The CTMF pages carry the full reflections. Here, they work as signposts showing how the
              bridge was bounded, evaluated, represented, and revised as the governing problem changed.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {civCtmfs.map((ctmf) => {
                const stageTheme = getFdcrStageTheme(ctmf.stageCode, ctmf.stage);

                return (
                  <RememberedLink
                    key={ctmf.slug}
                    href={`/ctmfs/${ctmf.slug}`}
                    returnHref={`/projects/${slug}`}
                    returnLabel="Back to CIV102"
                    className="rounded-[1.45rem] border border-slate-900/10 bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white">
                    <span
                      className={`inline-flex px-3 py-2 text-[0.68rem] uppercase tracking-[0.28em] ${stageTheme.indicatorClassName}`}
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {getFdcrStageLabel(ctmf.stageCode ?? ctmf.stage.charAt(0), ctmf.stage)}
                    </span>
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
                );
              })}
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
          <Link
            href="/?portal=work"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.28em] neo-chip bg-[#efe7d6] px-4 py-2 text-black hover:-translate-y-1 hover:text-black"
            style={{ fontFamily: "var(--font-vercetti)" }}>
            <span aria-hidden="true">&larr;</span>
            Back to Timeline
          </Link>
          <div className="neo-chip -rotate-2 bg-[#ffd23c] px-4 py-2">
            <p
              className="text-right text-[0.7rem] uppercase tracking-[0.32em] text-black md:text-xs"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {timelinePoint.year}
            </p>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
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
              <span
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Evidence-led case study
              </span>
            </div>

            <p
              className="mb-3 text-[0.72rem] uppercase tracking-[0.32em] text-emerald-200/80"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Project Overview
            </p>
            <h1
              className="max-w-4xl text-[2.9rem] leading-[0.94] text-white md:text-[4.4rem] xl:text-[5.2rem]"
              style={{ fontFamily: "var(--font-soria)" }}>
              Praxis II - {detail.title}
            </h1>

            <div className="mt-8 grid gap-5">
              {praxisIIOverviewParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-4xl text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {praxisIIClaims.map((claim) => (
                <div
                  key={claim}
                  className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={claim} />
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            {[praxisIIFigures.problem, praxisIIFigures.workflow].map((figure) => (
              <article key={figure.label} className={`${lightPanelClass} overflow-hidden p-4`}>
                <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                </div>
                <div className="overflow-hidden rounded-[1.45rem] border border-slate-900/10 bg-white">
                  <div className="relative h-[18rem] w-full">
                    <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                  </div>
                </div>
                <p
                  className="mt-4 px-2 text-sm leading-7 text-slate-800/78"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {figure.caption}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <article className={`${lightPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Objectives and Stakeholders
            </p>
            <div className="mt-5 grid gap-4">
              {praxisIIObjectivesParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-900/80"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
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

            <div className="mt-6 grid gap-5">
              {[praxisIIFigures.framing, praxisIIFigures.stakeholderMap].map((figure) => (
                <article key={figure.label} className="rounded-[1.25rem] border border-slate-900/10 bg-white/70 p-4">
                  <p
                    className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                  <div className="overflow-hidden rounded-[1.2rem] border border-slate-900/10 bg-white">
                    <div className="relative h-[20rem] w-full md:h-[24rem] lg:h-[22rem]">
                      <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                    </div>
                  </div>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-900/76"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.caption}
                  </p>
                </article>
              ))}
            </div>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Requirements and Evaluation Criteria
            </p>

            <div className="mt-5 grid gap-4">
              {praxisIIRequirementsParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <ul className="mt-6 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisIIRequirements.map((requirement) => (
                <li
                  key={requirement}
                  className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100">
                  {requirement}
                </li>
              ))}
            </ul>

            <article className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-4 px-2 pt-2">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  1-pager
                </p>
              </div>
              <div className="grid gap-4">
                {[praxisIIFigures.onePagerFront, praxisIIFigures.onePagerBack].map((figure) => (
                  <figure key={figure.label} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white p-3">
                    <p
                      className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {figure.label}
                    </p>
                    <div className="relative h-[34rem] w-full">
                      <Image
                        src={figure.src}
                        alt={figure.alt}
                        fill
                        sizes="(min-width: 1280px) 44vw, 100vw"
                        className={figure.imageClassName}
                      />
                    </div>
                    <figcaption
                      className="mt-4 text-sm leading-7 text-slate-900/80"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {figure.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
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
                  Convertible heated glove with controlled dexterity modes
                </h2>
              </div>
            </div>

            <div className="grid gap-4">
              {[praxisIIFigures.modes, praxisIIFigures.schematic].map((figure) => (
                <article key={figure.label} className="overflow-hidden rounded-[1.4rem] border border-slate-900/10 bg-white p-4">
                  <p
                    className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                  <div className="overflow-hidden rounded-[1.25rem] border border-slate-900/10 bg-white">
                    <div className="relative h-[16rem] w-full">
                      <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                    </div>
                  </div>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-800/78"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.caption}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 px-2">
              {praxisIIFinalSolutionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-800/78"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Why This Solution Was Selected
            </p>

            <div className="mt-5 grid gap-4">
              {praxisIISelectionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
              <table className="min-w-full border-collapse" style={{ fontFamily: "var(--font-vercetti)" }}>
                <thead className="bg-white/8 text-left text-[0.68rem] uppercase tracking-[0.28em] text-emerald-100/72">
                  <tr>
                    <th className="px-4 py-4">Measure</th>
                    <th className="px-4 py-4">Value</th>
                    <th className="px-4 py-4">Why It Mattered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {praxisIISelectionMetrics.map((row) => (
                    <tr key={row.metric} className="align-top">
                      <td className="px-4 py-4 text-sm text-white">{row.metric}</td>
                      <td className="px-4 py-4 text-sm text-emerald-200">{row.value}</td>
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
                className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                Key Engineering Design Decisions
              </p>
              <h2
                className="mt-3 text-4xl text-white"
                style={{ fontFamily: "var(--font-soria)" }}>
                The project improved when scope, evidence, and artifact decisions stopped drifting apart
              </h2>
            </div>
            <p
              className="max-w-xl text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Praxis II only started to make sense once the framing, the testing procedure, and the final concept were all aligned around the same winter telescope-use failure.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {praxisIIDecisions.map((decision, index) => (
              <article key={decision.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.28em] text-emerald-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-2xl text-white" style={{ fontFamily: "var(--font-soria)" }}>
                  {decision.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-7 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={decision.body} />
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[praxisIIFigures.wireOptimization, praxisIIFigures.folding].map((figure) => (
              <article key={figure.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-4 px-2 pt-2">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                </div>
                <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b131d]">
                  <div className="relative h-[16rem] w-full">
                    <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                  </div>
                </div>
                <p
                  className="mt-4 px-2 text-sm leading-7 text-slate-300"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {figure.caption}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Iterative Design Process
            </p>

            <div className="mt-5 grid gap-4">
              {praxisIIProcessParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-900/80"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  <CitationText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {praxisIIPhases.map((phase) => (
                <article key={phase.id} className="rounded-[1.25rem] border border-slate-900/10 bg-white/70 px-4 py-4">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-700/58"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {phase.id}
                  </p>
                  <h3 className="mt-2 text-xl text-slate-950" style={{ fontFamily: "var(--font-soria)" }}>
                    {phase.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-7 text-slate-900/74"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {phase.body}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <article className={`${lightPanelClass} overflow-hidden p-4`}>
            <div className="mb-4 flex items-center justify-between gap-3 px-2 pt-2">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  What I Learned Through the Process
                </p>
                <h2
                  className="mt-2 text-3xl text-slate-950"
                  style={{ fontFamily: "var(--font-soria)" }}>
                  The issue was preserving manipulability, not only adding warmth
                </h2>
              </div>
            </div>

            <div className="grid gap-4">
              {[praxisIIFigures.temp, praxisIIFigures.dexterity].map((figure) => (
                <article key={figure.label} className="overflow-hidden rounded-[1.35rem] border border-slate-900/10 bg-white p-4">
                  <p
                    className="mb-3 text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.label}
                  </p>
                  <div className="overflow-hidden rounded-[1.2rem] border border-slate-900/10 bg-white">
                    <div className="relative h-[15rem] w-full">
                      <Image src={figure.src} alt={figure.alt} fill className={figure.imageClassName} />
                    </div>
                  </div>
                  <p
                    className="mt-4 text-sm leading-7 text-slate-800/78"
                    style={{ fontFamily: "var(--font-vercetti)" }}>
                    {figure.caption}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 px-2">
              {praxisIILearningParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-800/78"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article className={`${darkPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Self-Reflection
            </p>

            <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white">
              <div className="px-4 pt-4">
                <p
                  className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {praxisIIFigures.folding.label}
                </p>
              </div>
              <div className="relative h-[18rem] w-full">
                <Image
                  src={praxisIIFigures.folding.src}
                  alt={praxisIIFigures.folding.alt}
                  fill
                  className={praxisIIFigures.folding.imageClassName}
                />
              </div>
            </div>
            <p
              className="mt-4 text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisIIFigures.folding.caption}
            </p>

            <div className="mt-6 grid gap-4">
              {praxisIIReflectionParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-200"
                  style={{ fontFamily: "var(--font-vercetti)" }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
              <p
                className="text-[0.68rem] uppercase tracking-[0.28em] text-emerald-200/70"
                style={{ fontFamily: "var(--font-vercetti)" }}>
                What This Clarified
              </p>
              <ul className="mt-3 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
                {praxisIISkills.map((skill) => (
                  <li key={skill} className="text-sm leading-7 text-slate-300">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <ProjectCtmfSynthesisSection
          synthesis={praxisIICtmfSynthesis}
          accentClassName="text-slate-700/60"
        />

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <article className={`${darkPanelClass} p-6 md:p-7`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-200/70"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Team Credit
            </p>
            <p
              className="mt-4 text-sm leading-7 text-slate-300"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisIITeamCredit}
            </p>
            <div className="mt-5 grid gap-3" style={{ fontFamily: "var(--font-vercetti)" }}>
              {praxisIITeam.map((member) => (
                <div
                  key={member.name}
                  className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-sm text-white">{member.name}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{member.role}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={`${lightPanelClass} p-6 md:p-8`}>
            <p
              className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-700/60"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              Connecting CTMFs With Praxis II
            </p>
            <h2 className="mt-3 text-4xl text-slate-950" style={{ fontFamily: "var(--font-soria)" }}>
              Three CTMFs explain how the project narrowed, reopened, and finally converged
            </h2>
            <p
              className="mt-4 max-w-2xl text-sm leading-7 text-slate-800/72"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              These CTMF pages carry the deeper reflections. On the project page, they act as signposts for the three distinctive turns in Praxis II: diagnosing the real mismatch, rebuilding the testing logic, and using early generative prompts without letting them overclaim the final design.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {praxisIICtmfs.map((ctmf) => {
                const stageTheme = getFdcrStageTheme(ctmf.stageCode, ctmf.stage);

                return (
                  <RememberedLink
                    key={ctmf.slug}
                    href={`/ctmfs/${ctmf.slug}`}
                    returnHref={`/projects/${slug}`}
                    returnLabel="Back to Praxis II"
                    className="rounded-[1.45rem] border border-slate-900/10 bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white">
                    <span
                      className={`inline-flex px-3 py-2 text-[0.68rem] uppercase tracking-[0.28em] ${stageTheme.indicatorClassName}`}
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {getFdcrStageLabel(ctmf.stageCode ?? ctmf.stage.charAt(0), ctmf.stage)}
                    </span>
                    <h3 className="mt-3 text-[2rem] leading-tight text-slate-950" style={{ fontFamily: "var(--font-soria)" }}>
                      {ctmf.title}
                    </h3>
                    <p
                      className="mt-4 text-sm leading-7 text-slate-900/72"
                      style={{ fontFamily: "var(--font-vercetti)" }}>
                      {praxisIICtmfLessons[ctmf.slug]}
                    </p>
                  </RememberedLink>
                );
              })}
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
          <RememberedBackLink
            fallbackHref="/?portal=work"
            fallbackLabel="Back to Timeline"
            className="neo-chip bg-[#efe7d6] px-4 py-2 text-black hover:-translate-y-1 hover:text-black"
          />
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

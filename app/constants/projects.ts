import { Ctmf } from "../types";
import { resolveVideoPath } from "../lib/sitePath";

type FdcrStageTheme = {
  indicatorClassName: string;
  tileFill: string;
  tileText: string;
};

const FDCR_STAGE_THEME_BY_CODE: Record<string, FdcrStageTheme> = {
  F: {
    indicatorClassName: "fdcr-indicator fdcr-indicator--frame",
    tileFill: "#31d7c4",
    tileText: "#000000",
  },
  D: {
    indicatorClassName: "fdcr-indicator fdcr-indicator--diverge",
    tileFill: "#ffd23c",
    tileText: "#000000",
  },
  C: {
    indicatorClassName: "fdcr-indicator fdcr-indicator--converge",
    tileFill: "#ff8a5b",
    tileText: "#000000",
  },
  R: {
    indicatorClassName: "fdcr-indicator fdcr-indicator--represent",
    tileFill: "#7ab8ff",
    tileText: "#000000",
  },
  "F/R": {
    indicatorClassName: "fdcr-indicator fdcr-indicator--frame-represent",
    tileFill: "#31d7c4",
    tileText: "#000000",
  },
  "F/D": {
    indicatorClassName: "fdcr-indicator fdcr-indicator--frame-diverge",
    tileFill: "#31d7c4",
    tileText: "#000000",
  },
  "R/C": {
    indicatorClassName: "fdcr-indicator fdcr-indicator--represent-converge",
    tileFill: "#7ab8ff",
    tileText: "#000000",
  },
};

const FDCR_STAGE_NAME_TO_CODE: Record<string, string> = {
  FRAME: "F",
  DIVERGE: "D",
  CONVERGE: "C",
  REPRESENT: "R",
};

export const getFdcrStageTheme = (stageCode?: string, stage?: string): FdcrStageTheme => {
  const normalizedCode = stageCode?.toUpperCase().replace(/\s+/g, "");

  if (normalizedCode && FDCR_STAGE_THEME_BY_CODE[normalizedCode]) {
    return FDCR_STAGE_THEME_BY_CODE[normalizedCode];
  }

  const primaryCode =
    normalizedCode?.split("/").find(Boolean) ??
    FDCR_STAGE_NAME_TO_CODE[stage?.split("/")[0]?.trim().toUpperCase() ?? ""] ??
    "F";

  return FDCR_STAGE_THEME_BY_CODE[primaryCode] ?? FDCR_STAGE_THEME_BY_CODE.F;
};

export const getFdcrStageLabel = (stageCode?: string, stage?: string) =>
  stageCode ? `[${stageCode}] ${stage}` : stage ?? "";

export const PROJECTS: Ctmf[] = [
  {
    slug: "challenge-assumptions",
    title: 'Challenge Assumptions',
    stage: 'Frame / Diverge',
    stageCode: 'F/D',
    subtext: 'Questioned whether the bottom flange was still doing enough useful structural work to justify its material cost once manufacturability became a real structural constraint.',
    overview: 'Challenge assumptions is a frame / diverge CTMF that tests whether inherited features still deserve authority under the current evidence, then opens new design directions once they stop matching the real constraint set.',
    whyItMatters: 'In CIV102, it mattered because the bridge stopped being judged as the strongest closed section on paper and started being judged as the strongest bridge that could actually fit on one sheet and be built.',
    evidence: [
      'CIV102: after Design 3 reached about 2.12 kN but failed the fitting check, the team challenged whether the bottom flange still deserved to remain and shifted the bridge toward a pi-beam.',
      'Praxis I: the same mindset became critical once evidence showed that can-opening noise was not mainly being driven by depressurization.',
    ],
    application: 'I use Challenge Assumptions when a feature still feels structurally obvious, but the evidence suggests it may no longer be earning its material, complexity, or authority.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'F/D',
        claimHeadline: 'Challenge Assumptions Mattered When The Bottom Flange Stopped Earning Its Place Once Manufacturability Became Structural.',
        summary:
          'In CIV102, challenging assumptions mattered when the bridge stopped being judged as the strongest closed section on paper and started being judged as the strongest bridge that could actually be built. After Design 3 reached about 2.12 kN but failed the manufacturability check, the team challenged the assumption that the bottom flange still had to remain. Removing it reduced predicted load to 1861 N, saved about 25% of the material, and reframed the bridge as a buildable pi-beam rather than an unbuildable box section.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In CIV102, challenging assumptions mattered because it let the team revoke an inherited structural feature once it stopped serving the real governing problem. After Design 3 reached about 2.12 kN analytically but failed the manufacturability check, the important move was no longer to make the bridge stronger in the abstract, but to ask whether the bottom flange was still earning its place. Removing it reduced predicted load to about 1861 N, saved roughly 25% of the material, and shifted the bridge toward a pi-beam, so the CTMF changed both the bridge form and the criterion by which the bridge was being judged.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p14-img1.png',
                alt: 'Design 3 fitting output from the CIV102 report showing that the analytically strongest bridge could not fit on one matboard sheet.',
                caption:
                  'This report figure is where the framing problem becomes visible. Design 3 achieved about 2.12 kN analytically, but the fitting output showed that the bridge could not actually be manufactured on one sheet. That failure is what made assumption-challenging necessary.',
                imageClassName: 'object-contain',
                frameClassName: 'bg-[#0e1117]',
              },
              {
                src: '/context-evidence/raw/civ102-p15-img1.png',
                alt: 'Design 4.1 fitting output from the CIV102 report after removing the bottom flange.',
                caption:
                  'This is the exact turn the CTMF produced. After removing the bottom flange, the bridge lost some analytical capacity but saved material and moved toward a buildable pi-beam logic. The figure matters because it shows the assumption challenge happening inside the real manufacturability problem.',
                imageClassName: 'object-contain',
                frameClassName: 'bg-[#0e1117]',
              },
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Challenge assumptions is a frame / diverge CTMF that tests whether features that feel structurally obvious are still justified by the current evidence, then opens a different design path once inherited form stops matching the real constraint set.',
              'In CIV102, that mattered once optimization had already produced a bridge that looked excellent analytically but still could not fit on one matboard sheet.',
              'At that point, the better question was no longer simply how to make the bridge stronger, but which structural features were still earning their place under the real assignment constraints and what new bridge form became possible once they were removed.',
            ],
          },
          {
            title: 'How I Used It In CIV102',
            bullets: [
              'The strongest use of this CTMF came in Design 4.1, once the fitting algorithm showed that the analytically strongest bridge was not manufacturable and the project had to decide which parts of its inherited structural logic were still worth paying for.',
              'Up to that point, the closed box section and bottom flange still carried the authority of a familiar strong form, though once sheet fitting became a real structural constraint, that authority had to be tested rather than preserved automatically. The team responded by asking whether the bottom flange was still doing enough useful work to justify its material and fitting cost, and the report\'s answer was no: several modes were already heavily overprotected, especially tension and buckling case 2, while the effective area still had to shrink if the bridge was going to move toward a buildable layout.',
              'Removing the bottom flange therefore was not just geometry reduction. It was a framing decision that shifted the bridge away from inherited form and toward a pi-beam logic shaped by the actual constraint now governing the project.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p3-img1.png',
                alt: 'Final matboard layout schematic from the CIV102 report showing a manufacturable cutout arrangement.',
                caption:
                  'This report figure links the framing move back to the actual project outcome. The bridge only became a serious design once the team could move from an unbuildable analytical section toward a layout that could be cut from one sheet.',
                imageClassName: 'object-contain',
                frameClassName: 'bg-white',
              },
              {
                src: '/context-evidence/raw/civ102-p3-img2.png',
                alt: 'Completed bridge photograph from the CIV102 report showing the realized pi-beam bridge on the worktable.',
                caption:
                  'This photo ties the CTMF back to the project itself. The bottom-flange decision did not remain a theoretical discussion inside the report; it changed the bridge that was actually built and tested.',
                imageClassName: 'object-contain',
                frameClassName: 'bg-white',
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The limitation was not that the CTMF failed to question the bottom flange, because it did that well, but that the same skepticism was not extended strongly enough into local fabrication conditions such as splice reliability, adhesive behavior, and alignment tolerance.',
              'The project successfully challenged an inherited global feature, but the built bridge still later failed at the front splice rather than in the predicted global mode, so the framing improved at the level of section form and manufacturability without reaching the local fabrication sensitivity that ultimately governed failure.',
              'The deeper lesson is that challenging assumptions has to keep moving downward into the details a final design quietly depends on. In CIV102, revoking the bottom flange was the right framing correction, but it was not the last one the bridge needed.',
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF still fits my preference for engineering that is explicit, analyzable, and defensible, though CIV102 changed what that means in practice by showing that a feature can keep its authority simply because it looks familiar, symmetrical, or intuitively safer, even after the evidence has shifted elsewhere.',
              'What mattered here was not preserving the structurally obvious form, but recognizing when the governing problem had changed and revoking a feature that no longer deserved its material cost.',
              'The project made me see more clearly that framing is not only about choosing the right concept early. It is also about knowing when a feature that once made sense no longer does.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use this CTMF once before optimization hardens to question inherited form early, then use it again after fitting and manufacturability enter the project to test whether major structural features are still earning their place.',
              'Extend the same skepticism into splice regions, adhesive behavior, and alignment-sensitive details instead of applying it mainly to global section form.',
              'My practical rule after CIV102 is simple: if a feature consumes substantial material but no longer protects the governing problem, it should lose its privileged status and be challenged directly.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "stakeholder-mapping",
    title: 'Stakeholder Analysis',
    stage: 'Frame',
    stageCode: 'F',
    subtext: 'Used primary stakeholder conversations to frame the can-opening problem beyond noise alone before the team narrowed around a solution.',
    overview: 'Stakeholder analysis is a framing CTMF that identifies who is affected by a design and what success has to protect before the project narrows too quickly around one metric.',
    whyItMatters: 'In Praxis I, it mattered because primary student conversations surfaced spill control, beverage disturbance, and awkward interaction as real concerns, which expanded the problem beyond noise alone.',
    evidence: [],
    application: 'I use stakeholder analysis early to frame what the project must protect, then revisit it after testing to check whether the project is still responding to what those users actually cared about.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'F',
        claimHeadline: 'Stakeholder Analysis Should Expand the Design Frame Before the Project Collapses Into Noise Alone.',
        summary:
          'In Praxis I, stakeholder analysis mattered because it widened the project beyond noise alone, translated unexpected student concerns into clearer requirements, and changed what counted as a successful design during convergence.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis I, stakeholder analysis mattered because it expanded the project from a noise-only problem into a broader user-centered engineering problem, and that shift changed what counted as a successful design.',
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Stakeholder analysis is a framing CTMF that identifies who is affected by a design, what they care about, and what success has to protect before the project narrows too quickly around one metric.',
              'In Praxis I, it was needed to stop the project from collapsing into noise reduction alone and to keep other user-visible consequences of can opening in view.',
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis I / How It Influenced The Project',
            bullets: [
              'I used stakeholder conversations to widen the problem beyond â€œmake the can quieter.â€ Primary student interviews surfaced concerns we had not foregrounded strongly enough: spillage and contents on the hands, beverage disturbance, awkward finger interaction, and opening burden or taking too long.',
              'Those concerns were then translated into explicit engineering requirements. Beverage integrity became liquid-loss and carbonation-loss requirements, while ease of use became gesture, force, and hand-pressure requirements.',
              'This directly influenced convergence: the final recommendation was not justified only by acoustic performance. The slider became stronger because it also protected beverage integrity and interaction quality better than alternatives like the water opener.',
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'Stakeholder analysis clarified what success needed to protect, but it did not reveal what physically caused the sound event.',
              'It could not determine whether the dominant issue was depressurization, tear-line fracture, or something else.',
              'In Praxis I, that meant stakeholder analysis gave the project a better frame, but mechanism-level testing was still needed to challenge the original physical explanation.',
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for explicit, grounded criteria before convergence begins.',
              'It also guarded against one of my main biases: reducing the project to one technically attractive metric. In Praxis I, that metric would have been noise alone.',
              'The deeper lesson for me was that good engineering framing has to keep multiple legitimate definitions of success visible at once, rather than optimizing too early around the clearest technical target.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use stakeholder analysis early, but make interviews more systematic and map recurring concerns directly into requirements.',
              'Distinguish between concerns I expected beforehand and concerns that genuinely emerged through stakeholder conversations.',
              'Revisit stakeholder analysis after testing to check whether the project is still protecting what stakeholders actually cared about once the explanation of the problem changes.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "requirements-matrix",
    title: 'Requirements Matrix',
    stage: 'Frame',
    subtext: 'Structured functional and non-functional requirements into a traceable matrix, ensuring all design objectives were systematically addressed.',
    overview: 'A requirements matrix translates broad project goals into explicit criteria and constraints that can be checked throughout iteration rather than only at the end.',
    whyItMatters: 'It creates accountability between the original brief, what gets designed, and how a final direction is justified.',
    evidence: [
      'Praxis I: translated the broad goal of quieter opening into explicit criteria around peak noise, beverage integrity, portability, and accessibility.',
      'CIV102: aligned bridge decisions with mass, span, and load constraints that could not be negotiated away.',
      'Portfolio work: filtered content and layout choices against clarity, continuity, and reflection goals.',
    ],
    application: 'I use requirement matrices to keep decisions traceable, especially when multiple criteria compete and our team needs a clear basis for tradeoffs.',
  },
  {
    slug: "systems-thinking",
    title: 'Systems Thinking',
    stage: 'Frame',
    subtext: 'Applied holistic systems analysis to understand interdependencies between subsystems and external constraints across all projects.',
    overview: 'Systems thinking widens the frame from isolated artifacts to interactions, incentives, dependencies, and downstream effects that shape whether a design actually works in context.',
    whyItMatters: 'It prevents oversimplified problem statements and supports decisions that respond to the broader environment around a project.',
    evidence: [
      'Praxis II: centered on identifying system boundaries, leverage points, and cross-stakeholder effects before proposing an intervention.',
      'CIV102: balanced theoretical analysis with fabrication realities, material behavior, and failure modes.',
      'Portfolio work: connected separate assignments into one narrative of growth rather than treating them as disconnected deliverables.',
    ],
    application: 'I use systems thinking whenever the project outcome depends on relationships between people, materials, processes, or institutions rather than a single object alone.',
  },
  {
    slug: "root-cause-analysis",
    title: 'Root Cause Analysis',
    stage: 'Frame',
    stageCode: 'F',
    subtext: 'Moved the project from broad winter discomfort toward the specific human-interface breakdown that was actually disrupting telescope use.',
    overview: 'Root cause analysis pushes beyond the stated problem to identify the interacting causes that are actually producing failure. In Praxis II, it helped reframe winter astronomy from a vague discomfort problem into a more useful engineering problem about dexterity, interface, exposure, and workflow breakdown.',
    whyItMatters: 'It keeps a project from optimizing around a symptom when the real leverage lies deeper in the failure chain.',
    evidence: [
      'Praxis II: shifted the project from generic winter discomfort to the dexterity-manipulability gap experienced during fine telescope operation in cold weather.',
      'Praxis II: opened three legitimate intervention pathways: error mitigation, dexterity improvement, and manipulability improvement, before later convergence narrowed the project.',
    ],
    application: 'I use root cause analysis when a problem seems broad, ambiguous, or easy to misread from surface symptoms alone.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'F',
        claimHeadline: 'Root Cause Analysis Should Expose The Winter Human-Interface Breakdown Before The Project Collapses Into Generic Cold Discomfort.',
        summary:
          'In Praxis II, root cause analysis mattered because it stopped our team from treating winter discomfort as the problem and instead identified a more actionable breakdown: cold-weather telescope use repeatedly forces astronomers into a tradeoff where warmth, fine manipulation, and observing continuity cannot all be preserved at once.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis II, root cause analysis mattered because it stopped our team from treating winter discomfort as the real problem and instead exposed a more actionable breakdown: telescope observing in the cold repeatedly forces users to trade away either warmth or fine hand control.',
              'The strongest result of this CTMF was not the glove itself. It was the reframing that revealed three real intervention pathways: mitigate the consequences of use errors, improve the user\'s dexterity under winter conditions, or improve manipulability by reducing the precision demanded by telescope operation.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-fig1-problem.png",
                alt: "Praxis II figure showing a RASC member removing a glove to make a telescope adjustment.",
                caption:
                  "This image makes the root-cause claim concrete. Users were not simply cold; they were repeatedly sacrificing warmth to recover the fingertip precision needed for astronomy tasks.",
              },
              {
                src: "/context-evidence/raw/praxis2-root-cause-fishbone.svg",
                alt: "Fishbone diagram summarizing the interacting causes behind winter dexterity failure during telescope use.",
                caption:
                  "The fishbone clarifies the real problem as a system of interacting causes: winter exposure, glove bulk, fine telescope tasks, workflow delays, and equipment diversity all contributed to the same repeated human-interface breakdown.",
              },
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Root cause analysis is a framing CTMF used to determine what is actually failing, what conditions are producing that failure, and where a design can intervene most effectively.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-fig2-workflow.png",
                alt: "Praxis II workflow diagram showing dexterity-sensitive observing steps and resulting failure loops.",
                caption:
                  "The workflow view is important because it shows why the problem could not be treated as simple cold discomfort. Setup, focusing, swaps, and recentering formed a repeated error-and-rework loop under winter conditions.",
              },
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis II / How It Influenced The Project',
            calloutTitle: "Primary evidence that changed the frame",
            callouts: [
              'RASC interview: existing heated gloves were described as big thick things that remove the dexterity needed for astronomy.',
              'RASC interview: users wanted fingertips free for little fiddly controls and detailed adjustments such as focus and eyepiece handling.',
              'Preliminary proxy testing: glove use slowed the task much more than brief cold exposure alone, suggesting the bottleneck was a winter human-interface breakdown rather than temperature in isolation.',
            ],
            bullets: [
              'I used root cause analysis to break the broad winter-astronomy issue into multi-fauceted causes instead of accepting cold weather as the primary issue. Primary research showed that the problem was concentrated around fine telescope tasks such as focusing, tightening, eyepiece changes, and handling small components under dim red-light conditions.',
              'The RASC interview was especially important, it showed that users often expose their fingertips because ordinary heated gloves are too bulky for the little fiddly controls of telescope operation, and that dropped parts or poor tactile feedback can create extra frustration, delay, and rework. In our own field observations, evidence supported the same claim: the problem was not just that astronomers were cold, but that winter conditions repeatedly broke the hand-interface relationship that telescope work depends on.',
              'Once the root causes were clearer, our team\'s divergence was clarified into three distinct intervention pathways: error mitigation, dexterity improvement, and manipulability improvement. Error mitigation addressed the consequences of slips, dropped parts, or workflow mistakes; dexterity improvement preserved the user\'s hand function through heating, thermal zoning, or similar human-centered support; and manipulability improvement reduced the precision demanded by the telescope through knob-turning aids, autonomous control, or other telescope-side changes. That kept the project from collapsing too early into a glove-only solution, even though ultimately was the final recommended deign. ',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-fig3-framing.png",
                alt: "Praxis II framing diagram contrasting redesigning the telescope with preserving user dexterity.",
                caption:
                  "This framing diagram is the clearest visual proof of what root cause analysis changed. The project did not jump directly to a glove; it first separated error mitigation, dexterity improvement, and manipulability improvement before later convergence narrowed the field.",
                imageClassName: "object-contain bg-white p-3",
                figureClassName: "xl:col-span-2",
              },
              {
                src: "/context-evidence/raw/praxis2-high-low-modes.png",
                alt: "Praxis II prototype figure showing high- and low-dexterity glove modes.",
                caption:
                  "Later prototyping still reflects the root-cause framing. Once preserving user dexterity became the stronger path, the design moved toward controlled shifts between warmth and fingertip access instead of treating heating alone as sufficient.",
                imageClassName: "object-contain bg-white p-3",
                figureClassName: "xl:col-span-2",
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'While root cause analysis often clarified what kind of failure the project needed to address, it was not by itself able to prove which pathway would be best. It showed that cold exposure, glove bulk, fine controls, repeated rework, and equipment diversity interacted, but could not determine on its own whether the best response was telescope-side redesign, hand-centered thermal support, or environmental intervention.',
              'It also initially grouped several effects together under dexterity loss before later testing separated them more carefully. Early on, that meant our team still risked compressing numbness, reduced tactile feedback, increased completion time, and increased error into one broad category.',
              'In other words, root cause analysis was strong enough to improve framing, but it was not strong enough to replace testing, prototyping, and later rescoping. The fishbone could reveal the system of causes; it could not close the design argument by itself.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-graph-time.png",
                alt: "Praxis II graph comparing task performance timing across winter-related test conditions.",
                caption:
                  "Root cause analysis improved the frame, but testing was still required to separate effects inside that frame. This timing evidence helped show that glove-related interaction burden mattered differently from brief cold exposure alone.",
              },
              {
                src: "/context-evidence/raw/praxis2-fig4-stakeholders.png",
                alt: "Praxis II stakeholder map for the RASC project.",
                caption:
                  "The stakeholder map also shows the limit of root cause analysis by itself. It could expose interacting pressures, but it could not on its own prove which intervention path would satisfy community fit, equipment diversity, and usability most effectively.",
                imageClassName: "object-cover object-top bg-white",
                frameClassName: "aspect-[1160/704] bg-white",
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for understanding the underlying issue before optimizing a solution.',
              'It also guarded against one of my recurring biases: narrowing too quickly around the first technically coherent direction. In Praxis II, root cause analysis helped resist premature fixation by showing that the project was not automatically a glove problem. It was a winter human-equipment interaction problem with three credible intervention pathways: error mitigation, dexterity improvement, and manipulability improvement.',
              'The deeper lesson for me was that good framing depends on separating symptoms, causes, and amplifying conditions. Without that separation, even a detailed design process can become overconfident too early.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use root cause analysis earlier and update it explicitly after each major test result instead of leaving the causal map implicit once divergence begins.',
              'Separate root causes, amplifiers, and downstream consequences more deliberately. In Praxis II, cold exposure, glove bulk, repeated exposure, and workflow rework were related, but they were not all the same kind of cause.',
              'Pair stakeholder evidence with simple task-performance tests earlier so the fishbone is supported by both lived experience and measured behavior.',
              'My future rule is not to treat the stated problem as the root cause, and not to treat the first fishbone as finished once the project starts generating concepts.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-folding-configuration.webp",
                alt: "Praxis II folding glove configuration prototype.",
                caption:
                  "A later prototype like this is useful here because it shows what future root-cause work should support: not one frozen interpretation of the problem, but revisable concepts that stay aligned with the actual bottleneck as evidence changes.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "functional-prototyping",
    title: 'Functional Prototyping',
    stage: 'Represent',
    stageCode: 'R',
    subtext: 'Made opener concepts testable through force, control, and beverage-handling evidence.',
    overview: 'Functional prototyping is a representing CTMF because it turns a concept into a testable artifact built to produce evidence rather than simply explain appearance or intent.',
    whyItMatters: 'In Praxis I, it mattered because once the problem had been framed clearly enough, the team needed working mechanisms that could be compared under the real constraints of opening, handling, and beverage control.',
    evidence: [
      'Praxis I: recorded force and torque tests for the slider, water opener, and rubber-tab opener so each mechanism could be judged through use behavior rather than sketches alone.',
      'Praxis I: prototype testing made convergence more defensible because the team could compare how each opener handled force, control, hand burden, and beverage interaction.',
    ],
    application: 'I use functional prototyping when a design needs verification data and the prototype must be shaped around the test rather than around presentation.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'R',
        claimHeadline: 'Functional Prototyping Should Be Built For Verification, Not Only Communication.',
        summary:
          'In Praxis I, functional prototyping mattered because the slider, water opener, and rubber-tab concepts had to become working mechanisms before the team could compare them seriously; the force and torque videos made each concept answer the same practical question, whether it could address the can-opening problem without creating worse hand-use or beverage-control problems.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis I, functional prototyping mattered because it turned three competing opener ideas into testable interactions, so the team could judge the slider, water opener, and rubber tab through force, torque, control, mess risk, and usability rather than through diagrams alone.',
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Functional prototyping is a representing CTMF in which a prototype is built to test how a concept actually behaves in use rather than how convincing it looks in a sketch or render. In Praxis I, that meant turning opener concepts into working mechanism tests that could expose force, torque, opening control, and whether the mechanism introduced new usability or beverage-handling problems.',
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis I / How It Influenced The Project',
            bullets: [
              'Because Praxis I had already framed the goal as quieter can opening without losing portability, accessibility, safety, or beverage integrity, the prototypes only mattered if they reproduced those constraints during actual use, which is why the force and torque videos were useful: they made each concept perform the opening interaction instead of letting the team argue from static sketches.',
              'The slider, water opener, and rubber-tab tests gave the team a common basis for comparison by showing how each mechanism transferred force into tab motion, how much awkward handling or repositioning it demanded, and whether it preserved control over the drink while still addressing the sound event.',
              'That evidence made the slider easier to defend because it could be judged as a working mechanism, and under that standard it created fewer visible burdens than the alternatives while preserving better control over the interaction itself.',
            ],
            figures: [
              {
                kind: "video",
                src: resolveVideoPath("praxis1-functional-slider", "/videos/praxis1-functional-prototypes/slider.mov"),
                alt: "Praxis I force and torque test video for the slider opener prototype.",
                caption:
                  "The slider test matters because it shows the selected concept performing the opening task under real force and control constraints rather than being judged from a render alone.",
              },
              {
                kind: "video",
                src: resolveVideoPath("praxis1-functional-water-opener", "/videos/praxis1-functional-prototypes/water-opener.mov"),
                alt: "Praxis I force and torque test video for the water opener prototype.",
                caption:
                  "The water opener test matters because it exposed the tradeoff directly: a concept could still address sound while introducing more handling burden and less control over the opening event.",
              },
              {
                kind: "video",
                src: resolveVideoPath("praxis1-functional-rubber-tab", "/videos/praxis1-functional-prototypes/rubber-tab.mov"),
                alt: "Praxis I force and torque test video for the rubber tab opener prototype.",
                caption:
                  "The rubber-tab test shows why functional prototyping was needed before convergence, since a concept that seemed plausible on paper still had to prove that its grip, force path, and opening control were strong enough to justify keeping it.",
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The limitation was that these tests captured mechanism behavior more strongly than they captured long-term durability, repeatability, hygiene across repeated use, or performance across different cans and users, so the prototype evidence strengthened the slider argument without proving every final-product claim.',
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF matters to my position because it turns a prototype into evidence for a decision rather than a presentation object, and in Praxis I it kept the project from trusting a clean concept too early by forcing the team to compare how the mechanisms actually behaved once force, control, and beverage interaction were made visible.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'In future projects, I would define the verification question before building each prototype, state clearly which requirement the prototype can and cannot test, and separate functional prototypes from communication prototypes so a convincing artifact is not mistaken for validated performance.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "scamper-method",
    title: 'SCAMPER Method',
    stage: 'Diverge',
    subtext: 'Used Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, and Reverse prompts to generate creative design alternatives.',
    overview: 'SCAMPER is a structured ideation method that forces concept generation from multiple angles so design exploration does not stall around the first plausible idea.',
    whyItMatters: 'It expands the solution space quickly and makes divergence more intentional than unstructured brainstorming alone.',
    evidence: [
      'Praxis I: helped push beyond a single modification idea toward alternate ways of storing and switching lead.',
      'Praxis II: supported exploration of intervention directions at different scales before narrowing the proposal.',
      'Portfolio work: informed experiments in sequencing atmosphere, reflection, and technical documentation.',
    ],
    application: 'I use SCAMPER when a team has identified the core problem but needs prompts that break habitual thinking and produce more varied concepts.',
  },
  {
    slug: "calculations-simulation",
    title: 'Calculations / Simulation',
    stage: 'Represent',
    stageCode: 'R',
    subtext:
      'Used MATLAB and Python to compare bridge geometries by their weakest safety margin.',
    overview:
      'Calculations and simulation are a representing CTMF when they convert a physical design into explicit variables, equations, failure modes, and comparable outputs that can guide later optimization.',
    whyItMatters:
      'In CIV102, it mattered because the bridge did not improve through one heroic calculation. It improved through repeated parameter sweeps over web spacing, diaphragm layout, and top-flange reinforcement under the real limits of material usage and matboard fitting.',
    evidence: [
      'CIV102: MATLAB and Python scripts generated load envelopes, sectional properties, failure-mode comparisons, matboard fitting checks, and bounded optimization passes for multiple bridge variables.',
      'Praxis I: the same mindset later appeared in using measured criteria and proxy testing to compare can-opening concepts more rigorously.',
    ],
    application:
      'I use calculations and simulation when a project needs a clear analytical representation of the design variables, constraints, and failure modes before the team trusts an optimization result.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'R',
        claimHeadline:
          'Calculations And Simulation Should Turn Bridge Design Into A Bounded Search For The Strongest Manufacturable Option.',
        summary:
          'In CIV102, calculations and simulation mattered because they let our team treat the bridge as a constrained optimization problem: generate candidate geometries, judge each by its weakest factor of safety, and keep only the strength that still earned its material cost and fit on one matboard sheet. The main value was not that the code produced numbers faster. It was that the code made three specific optimization passes legible and comparable. The main limit is that the search only optimized what the model represented well, which is why splice-sensitive fabrication behavior still escaped the final analytical optimum.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In CIV102, calculations and simulation mattered because they turned bridge design into a bounded optimization process rather than a sequence of intuitive geometry edits.',
              'Each candidate bridge was compared using its weakest factor of safety, meaning the first failure mode likely to run out of margin. That comparison rule mattered because it stopped the team from adding material to already-safe parts of the bridge while another mode still governed.',
              'The strongest project consequence was not one final number. It was a disciplined way to search for bridge states that balanced structural performance against material usage and manufacturability, which is why the code directly supported decisions about web spacing, diaphragm count, and top-flange reinforcement.',
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            figures: [
              {
                src: '/context-evidence/raw/civ102-p7-img1.png',
                alt: 'CIV102 shear-force and bending-moment envelopes generated from the moving train load cases.',
                caption:
                  'These load envelopes are the front end of the search process. They convert the moving train into explicit bending and shear demands, so every later optimization pass is responding to the same structural picture rather than to intuition.',
                imageClassName: 'object-contain',
              },
              {
                src: '/context-evidence/raw/civ102-p18-img1.png',
                alt: 'CIV102 fitting-code result showing the final 4.3 bridge geometry fitting on one matboard sheet.',
                caption:
                  'This fitting result shows why the search was bounded. A bridge candidate was not good enough if it was only strong on paper; it also had to fit onto one matboard sheet after accounting for splices and cut layout.',
                imageClassName: 'object-contain',
              },
            ],
            bullets: [
              'Calculations and simulation act as a representing CTMF when they turn a physical design into explicit variables, equations, constraints, failure modes, and comparable outputs.',
              'In CIV102, that meant using MATLAB and Python not just to check one bridge, but to sweep variables such as web spacing, diaphragm spacing, and top-flange material distribution while keeping the bridge inside material and fitting limits.',
              'The key comparison rule was the minimum factor of safety across the tracked failure modes. In plain terms, that meant each candidate was judged by the first place it was likely to fail, not by its best-looking number.',
              'That is what made the CTMF useful here. It did not just say whether a bridge worked. It represented the bridge as a bounded analytical model with an explicit way to compare alternatives.',
            ],
          },
          {
            title: 'How I Used It In CIV102',
            calloutTitle: 'Three bounded optimization passes',
            callouts: [
              'Web spacing: sweep the clear distance between the two webs and choose the value that balances buckling case 1 and buckling case 2, which settled near 60 mm.',
              'Diaphragm placement: generate the minimum number of diaphragms needed to satisfy the target thin-plate buckling margin, which produced 13 total diaphragms with unequal spacing.',
              'Top-flange distribution: test how a limited strip-length budget should be distributed and keep the configuration with the largest minimum factor of safety, which ended up being a uniform 2-layer top flange for the available material.',
            ],
            bullets: [
              'I used calculations and simulation to search a constrained design space instead of adjusting the bridge by feel. Before each sweep, the code reduced a bridge option to comparable outputs: the controlling factor of safety, the predicted failure load, and whether the pieces could still fit on one matboard sheet.',
              'The first important pass was web spacing. After removing the bottom flange, the bridge still had an 80 mm clear distance between the two vertical webs, but the report showed that buckling case 1 and buckling case 2 were wildly unbalanced. We used MATLAB to sweep every feasible value of w2 and selected about 60 mm because it brought those two failure modes much closer together. The load stayed at 1861 N, so the benefit was not raw strength; it was a less wasteful section with better-balanced reserve.',
              'The second pass was diaphragm placement. Instead of keeping uniformly dense bracing everywhere, the code used the shear envelope together with the thin-plate shear buckling equation to compute the minimum allowable spacing at each x-location along the bridge. That produced a symmetric but unequal layout with 13 total diaphragms, which met the target buckling margin without spending extra material on unnecessary stiffeners.',
              'The third pass was top-flange distribution under a limited strip-length budget. The team tested whether reinforcement should be concentrated near midspan, where compressive demand is highest, or spread more evenly along the bridge. The code compared two-zone flange layouts by the largest minimum factor of safety they could achieve, and for the available material it showed that the best answer was not a more elaborate pattern but a uniform two-layer top flange.',
              'Taken together, these passes explain the real project value of this CTMF. The code did not just make the bridge stronger. It removed material from places where it was no longer doing governing work and kept reinforcement only where it improved the weakest modes inside a buildable geometry.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p19-img1.png',
                alt: 'CIV102 MATLAB output for unequal diaphragm placement along the bridge span.',
                caption:
                  'This diaphragm-placement output is one of the clearest pieces of evidence for the new narrative. The code was not only checking one spacing value; it was generating the minimum diaphragm layout that still met the target buckling margin.',
                imageClassName: 'object-contain',
              },
              {
                src: '/context-evidence/raw/civ102-p20-img1.png',
                alt: 'CIV102 code output for one candidate top-flange strip-length allocation.',
                caption:
                  'These top-flange outputs matter because they show how the team compared competing material distributions instead of assuming that more local variation would always be better.',
                imageClassName: 'object-contain',
              },
              {
                src: '/context-evidence/raw/civ102-p20-img2.png',
                alt: 'CIV102 code output for another candidate top-flange strip-length allocation under a different material budget.',
                caption:
                  'Read together, the two strip-length cases show the actual selection logic: choose the flange configuration that gives the best minimum safety margin for the material budget you really have, not the configuration that merely looks most optimized.',
                imageClassName: 'object-contain',
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The limitation was not that the optimization was useless. The limitation was that it could only optimize the design space the model had formalized.',
              'The code could search web spacing, diaphragm count, flange distribution, and matboard fit rigorously because those variables were represented explicitly and judged through clear factor-of-safety comparisons. It could not give the same weight to splice sensitivity, glue variability, cutting tolerance, or assembly eccentricity because those conditions were not modeled with the same precision.',
              'That is why a bridge that looked carefully optimized analytically could still fail much earlier in physical testing. The search process was disciplined, but the search space was still incomplete.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-splice-failure.jpg',
                alt: 'CIV102 bridge showing the front splice failure during physical testing.',
                caption:
                  'This failure is the clearest boundary on the CTMF. The optimization process improved the modeled bridge very effectively, but it did not represent splice-sensitive fabrication behavior with the same strength as the global section calculations.',
                imageClassName: 'object-contain',
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for explicit, analyzable reasoning, but CIV102 changed what I think optimization actually means.',
              'A good optimization process does not just search efficiently. It depends on whether the search space and the objective function are honest about the conditions that really matter. In this project, the calculations were powerful because they made the tradeoff logic visible; they were dangerous when that visibility started to feel complete.',
              'The deeper lesson for me was that a clean optimum can still be partial. I now trust simulation most when I can state clearly what is being maximized, what constraints are included, and which real conditions are still being left outside the model.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Define the objective function explicitly before each optimization pass, including whether the code is maximizing predicted load, minimum factor of safety, or performance per unit material.',
              'Pair every sweep with a short list of important unmodeled constraints so the result is treated as conditional rather than complete.',
              'Bring fabrication-sensitive variables into the search earlier, especially splice behavior, glue reliability, and alignment tolerance, instead of leaving them to end-stage testing.',
              'Treat the best sampled candidate as a provisional answer inside the modeled design space, not as proof that the whole bridge has been optimized in reality.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "morphological-chart",
    title: 'Morphological Chart',
    stage: 'Diverge',
    stageCode: 'D',
    subtext: 'Generated distinct can-opening mechanism families before testing forced the frame to change.',
    overview: 'Morphological charts break a design problem into sub-functions and candidate means so teams can generate distinct mechanism combinations systematically instead of ideating in vague whole-product terms.',
    whyItMatters: 'In Praxis I, it mattered because it generated the mechanism families that later entered convergence, while later testing showed that the chart had widened implementation diversity more than explanatory diversity.',
    evidence: [],
    application: 'I use morphological charts when a problem can be decomposed into sub-functions, but I now treat them as revisable divergence tools that should be rebuilt when later evidence changes the frame.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'D',
        claimHeadline: 'Morph Charts Should Generate Distinct Mechanism Families, Then Be Rebuilt When Evidence Changes The Frame.',
        summary:
          'In Praxis I, the morphological chart mattered because it generated the mechanism families our team later compared and eliminated. Its limit was not a lack of breadth, but the fact that many early branches still depended on the same weakening explanation of the sound event. Once testing challenged that explanation, the chart should have been rebuilt.',
        sections: [
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'A morphological chart is a diverging CTMF that breaks a design problem into functions or sub-functions, then generates multiple candidate means under each so concept combinations can be explored systematically rather than through vague whole-object brainstorming.',
              'In Praxis I, it mattered because the project risk was premature fixation on one intuitive quiet-opener idea before our team had compared materially different mechanism directions.',
              'In practice, it decomposed the opening event into rows such as opening, depressurizing, handling, and silencing so divergence could happen at the level of mechanism logic rather than cosmetic variation.',
            ],
          },
          {
            title: 'How I Used It In Praxis I',
            calloutTitle: 'Mechanism families carried forward',
            callouts: [
              'needle-straw vent',
              'water opener',
              'rubber tab',
              'slider',
            ],
            figures: [
              {
                src: '/context-evidence/raw/praxis1-p3-img2.png',
                alt: 'Praxis I morphological chart showing rows for opening, depressurizing, handling, and silencing with alternative means under each.',
                caption:
                  'The morph chart is the key CTMF evidence because it shows the project moving from a vague quiet-opener idea to a structured mechanism space built from explicit sub-functions.',
                imageClassName: 'object-contain',
              },
              {
                src: '/context-evidence/raw/praxis1-alpha-brainstorming.png',
                alt: 'Praxis I Alpha release brainstorming page listing early mechanism directions for quieter can opening.',
                caption:
                  'This Alpha release page shows the downstream effect of the chart, where the generated rows turned into distinct concept families that the team could carry into later comparison.',
              },
            ],
            bullets: [
              'I used the morph chart to make divergence structured, visible, and traceable so later convergence would compare mechanism families rather than defend favorite sketches.',
              'That changed the level at which the project diverged, because instead of comparing variants of one opener, our team had to compare puncture venting, external damping, interface modification, and mechanism replacement as materially different intervention logics.',
            ],
          },
          {
            title: 'What It Generated',
            bullets: [
              'The chart generated the four families that actually stayed alive in the project: needle-straw vent, water opener, rubber tab, and slider.',
              'Those families then became the real convergence path, with needle-straw removed first, then water opener, and the final comparison narrowing to slider versus rubber tab.',
              'Its downstream effect remained visible in testing, where the slider emerged as the strongest overall because it improved noise reduction without the spill, boil-off, pressure, and gesture penalties that weakened the other families.',
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            figures: [
              {
                src: '/context-evidence/raw/praxis1-p3-img1.png',
                alt: 'Praxis I reflection sheet about divergence and anchoring during the project.',
                caption:
                  'This reflection captures the real limit of the chart, since the concept space widened while many branches still inherited the same explanation of the sound event.',
              },
            ],
            bullets: [
              'The main limitation was not breadth, but the hidden causal assumption the first chart carried about the sound event itself.',
              'Several branches still assumed the problem could be solved by depressurizing, damping, or muffling the standard opening event, which made concepts like the needle-straw, water opener, and rubber tab look diverse as artifacts while still sharing the same broader logic.',
              'Later vented-versus-unvented testing weakened that explanation, which made clear that the chart had widened implementation diversity more than explanatory diversity.',
            ],
          },
          {
            title: 'What I Learned / How I Would Use It Next Time',
            bullets: [
              'This CTMF still fits my preference for structured divergence because it kept multiple mechanism families visible long enough to compare.',
              'The deeper lesson from Praxis I is that a morph chart can protect against fixation on one concept without protecting against fixation on one causal story.',
              'My future rule is to mark assumed rows more clearly and rebuild the chart after any major test result that changes the explanation of the problem. In Praxis I, the vented-versus-unvented result should have triggered that second pass.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "brainstorming",
    title: 'Brainstorming',
    stage: 'Diverge',
    subtext: 'Facilitated structured ideation sessions with team members to generate a broad set of concepts without premature judgment.',
    overview: 'Brainstorming creates space for quantity, speed, and collaborative contribution before evaluation narrows the field.',
    whyItMatters: 'It surfaces different perspectives early and helps teams avoid converging around the loudest or most familiar idea too soon.',
    evidence: [
      'Praxis I: group ideation exposed alternative mechanisms and encouraged critique through iteration rather than personal attachment.',
      'Praxis II: discussions across multiple intervention directions helped compare different stakeholder and system responses.',
      'Portfolio work: opened up visual and narrative directions before settling on the current site structure.',
    ],
    application: 'I use structured brainstorming when our team needs shared ownership of concept generation and when rapid idea quantity is more valuable than immediate polish.',
  },
  {
    slug: "biomimicry",
    title: 'Biomimicry',
    stage: 'Diverge',
    stageCode: 'D',
    subtext: 'Used biological cold-survival strategies as divergence prompts for thermal zoning, local protection, and non-default glove concepts.',
    overview: 'Biomimicry uses biological survival strategies as functional analogies during divergence, helping a team generate concept families that would be hard to reach by iterating only from existing products.',
    whyItMatters: 'In Praxis II, it widened the project beyond standard winter-glove logic by turning polar bear fur, penguin huddling, and other cold-survival references into selective insulation, microclimate, and thermal-zoning ideas.',
    evidence: [],
    application: 'I use biomimicry early in divergence when a project benefits from non-default functional logics, then translate the analogy into explicit design principles, hypotheses, and later tests.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'D',
        claimHeadline: 'Biomimicry Should Generate Functional Design Logics, Not Stay As Nature-Themed Inspiration.',
        summary:
          'In Praxis II, biomimicry mattered because it widened divergence through functional biological analogies rather than through familiar winter-product assumptions alone. Its value was not that the final glove literally copied an animal. Its value was that it helped translate ideas like trapped warmth, selective insulation, and temporary microclimates into concept families that later became testable.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis II, biomimicry mattered because it gave our team a way to generate concept families from biological cold-survival strategies rather than from conventional winter-product assumptions, and that widened the design space before convergence narrowed it.',
              'The strongest project consequence was not that the final glove looked biomimetic. It was that biomimicry helped our team imagine selective thermal protection, local warm zones, and modal dexterity in engineering terms before later testing decided which of those ideas could survive.',
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            figures: [
              {
                src: "/context-evidence/raw/praxis2-biomimicry-translation.svg",
                alt: "Diagram mapping polar bear fur and penguin huddle references into functional principles and design translations for Praxis II.",
                caption:
                  "This is the useful level of biomimicry in Praxis II: biological references were translated into functional principles like selective insulation and buffered warmth, then turned into engineering hypotheses such as thermal zoning and protected warm-state logic.",
              },
            ],
            bullets: [
              'Biomimicry is a diverging CTMF that draws functional strategies from living systems rather than aesthetic cues. In Praxis II, it was used to explore how cold-adapted biological systems preserve performance through localized and adaptive protection, and to turn those strategies into new concept paths.',
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis II / How It Influenced The Project',
            calloutTitle: "Biological references that actually entered divergence",
            callouts: [
              'Beta Release: "Polar bear fur solution" and "hollow hairs that trap warm air."',
              'Beta Release: "Penguin huddle" and "we can create a small bubble."',
              'Beta Preparation: thermal zoning was explicitly broken into "Zone 1: Fingertips, Zone 2: Knuckle Zone, Zone 3: Wrist."',
              'Beta Preparation: our team linked this divergence directly to "our focus on sustainability," "value of appreciation of nature," and "passion for animals."',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-morph-chart.jpg",
                alt: "Praxis II morph chart showing diverging concept families for cold-weather telescope operation.",
                caption:
                  "The morph chart is one of the clearest pieces of project evidence that biomimicry widened the concept space structurally rather than just rhetorically. The biological references fed real concept branches during divergence.",
                imageClassName: "object-contain bg-white",
                frameClassName: "aspect-[1160/704] bg-white",
              },
              {
                src: "/context-evidence/raw/praxis2-lotus-chart.jpg",
                alt: "Praxis II lotus chart showing branching ideation around the cold-weather dexterity problem.",
                caption:
                  "The lotus chart matters here because it shows the project moving across several intervention scales at once. Biomimicry helped hold open glove, environmental, and localized-heating directions before convergence.",
                imageClassName: "object-contain bg-white",
                frameClassName: "aspect-[1024/768] bg-white",
              },
              {
                src: "/context-evidence/raw/praxis2-polar-bear.jpg",
                alt: "Polar bear photograph used as an external biological reference for efficient insulation logic.",
                caption:
                  "Polar bear fur mattered in Praxis II as a functional analogy, not a visual one. The useful translation was that warmth can come from efficient structure and trapped air rather than from indiscriminate bulk everywhere on the hand.",
              },
              {
                src: "/context-evidence/raw/praxis2-emperor-penguins.jpg",
                alt: "Emperor penguins huddling together used as an external biological reference for local microclimate protection.",
                caption:
                  "Penguin-huddle logic widened the environmental stream by suggesting that protection can come from creating a local warm zone or microclimate, not only from heating the hand uniformly at all times.",
              },
            ],
            bullets: [
              'I used biomimicry to widen divergence without defaulting too early to a standard heated-glove solution. Rather than beginning from existing products and making small variations, our team used biological references to ask how cold-adapted systems preserve performance through insulation, thermal concentration, and temporary protection, then translated those patterns into distinct concept directions.',
              'The strongest project evidence for this appears in the Beta ideation material, where biomimicry aligned naturally with our team\'s appreciation for nature and helped motivate designs that felt more distinctive than a default heated-glove starting point. Polar bear fur was used as a reference for efficient insulation through structure and trapped air, which pushed the glove stream away from heating the whole hand the same way and toward more selective thermal management, while countercurrent heat exchange, a biological strategy in which heat is transferred between adjacent flows moving in opposite directions before it is lost outward, helped support the final arrangement of the heating wires by reinforcing the idea that warmth should be directed where it most preserves dexterity rather than spread uniformly. Penguin huddling and igloo logic widened the environmental stream in a similar way by suggesting temporary protective microclimates and condensed warm spaces rather than only hand-mounted hardware.',
              'The biological references did not just widen divergence abstractly, but helped generate the heated glove and tent concepts in ways that matched both our team values and the actual thermal logic of the project.',
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            figures: [
              {
                src: "/context-evidence/raw/praxis2-wire-optimization.webp",
                alt: "Praxis II wire optimization figure showing engineered routing and heating layout decisions.",
                caption:
                  "This figure marks the limit of biomimicry. By the time routing, battery placement, and heat-distribution details were being engineered, biological analogy was no longer enough; the architecture had to be justified by electrical, ergonomic, and fabrication constraints.",
              },
            ],
            bullets: [
              'Biomimicry in Praxis II was limited not by creativity, but by the fact that analogy could widen the space without proving which ideas would still work once the design became electrical, wearable, and task-specific. Polar bear fur could suggest selective insulation and trapped warmth, though it could not determine wire routing or heating patterns, while penguin-huddle and igloo logic could justify local thermal environments without proving that enclosure-based solutions would remain portable or astronomy-compatible. Its strength, then, was in generating concept directions, not in carrying the argument through convergence.',
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF matters to my position because it shows the part of my design process that does not begin with narrowing, verification, or tightly structured comparison, but with keeping the concept space open long enough for less obvious directions to become available. Where root cause analysis and verification sharpen the problem and test the evidence, biomimicry helped keep early divergence from collapsing too quickly into what already seemed most rational or familiar.',
              'It also connected directly to my values. In Praxis II, nature appreciation, sustainability, and care for animals were not ideas added after the design work had already taken shape; they helped guide divergence by giving our team a source of functional reasoning outside default product assumptions. For me, that matters because biomimicry counters one of my recurring tendencies, which is to move too quickly toward tightly specified solution logic, while still fitting the kind of engineering judgment I trust most, since I only find it persuasive once the biological analogy has been translated into engineering terms and tested.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Going forward, I would use biomimicry more deliberately as a staged translation process by identifying the biological strategy, extracting the functional principle, converting it into a design hypothesis, and tying that hypothesis to a specific test.',
              'In Praxis II, that would have meant stating the chain more clearly: polar bear fur to trapped air and efficient insulation to selective glove insulation or thermal zoning to localized temperature-retention and dexterity testing; penguin huddling or igloo logic to buffered microclimate to protected warm zone or enclosure to portability, setup-burden, and task-compatibility testing.',
              'My practical rule is that biomimicry should generate concept logic, not stand in for proof, because if the biological analogy is still carrying the argument late in the project, it has not been translated into engineering evidence strongly enough.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "pugh-chart",
    title: 'Pugh Decision Matrix',
    stage: 'Converge',
    stageCode: 'C',
    subtext: 'Evaluated design alternatives against a datum using structured criteria comparison, enabling objective concept selection.',
    overview: 'A Pugh chart compares alternatives against a baseline across key criteria, helping teams identify relative strengths, weaknesses, and where hybrid solutions may outperform any single concept.',
    whyItMatters: 'It introduces discipline into convergence and makes concept selection discussable, revisable, and easier to defend.',
    evidence: [
      'Praxis I: used two Pugh chart iterations with different datum choices before selecting the final direction.',
      'Praxis II: applied the same comparative logic to weigh intervention options against stakeholder fit and feasibility.',
      'Portfolio work: evaluated structural directions by coherence, readability, and evidence of growth.',
    ],
    application: 'I use Pugh charts once there are several credible concepts and our team needs a transparent method for narrowing choices without relying on preference alone.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'C',
        claimHeadline: 'Pugh Charts Should Follow Reframing and Explicit Criteria, Not Substitute for Them.',
        summary:
          'The grounds are the actual concept comparisons between the vent concepts, water opener, rubber-tab opener, and slider. The warrant is that convergence becomes credible only when the criteria reflect the right frame and when later measurement can still rebut the ranking.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'Praxis I compared multiple concepts, including the needle or straw vent path, the water opener, the rubber-tab opener, and the slider-based can.',
              'The concept set was judged against criteria drawn from the framed opportunity: noise reduction, accessibility, portability, safety, contamination risk, and beverage integrity.',
              'The final measurement matrix later showed why the slider mattered quantitatively as well, with the strongest combination of noise reduction, liquid retention, low hand pressure, and low gesture count.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'A Pugh chart is a converging CTMF that compares concepts against a datum using explicit criteria so tradeoffs can be discussed rather than implied.',
              'Within FDCR, it belongs in Converging because it helps a team move from many plausible concepts toward a smaller number of defendable directions.',
              'It is most useful when our team needs a structured argument for why one concept class should keep moving and another should stop.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'This was a collaborative convergence tool, and the portfolio should keep that attribution visible rather than implying the matrix was solely mine.',
              'My use of the CTMF matters because it matched my preference for explicit criteria and transparent comparison rather than intuition-only ranking.',
              'At the same time, Praxis I taught me that I cannot treat a clean matrix as enough on its own, because the matrix only becomes trustworthy after the frame and the criteria are trustworthy.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was that the Pugh chart made the teamâ€™s convergence discussable and traceable rather than purely preference-driven.',
              'What did not work, or at least what should not be overstated, is the idea that the chart itself proved the slider was correct. The chart only narrowed the field; later proxy testing and measurement gave the recommendation stronger backing.',
              'The main failure risk in this CTMF was frame dependence: if we had kept the wrong explanation of the sound event, the Pugh chart would still have converged cleanly on a weaker class of solutions.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF fits my bias toward explicit logic, measurable structure, and defensible criteria, which is why it felt natural and persuasive to me.',
              'That same fit is risky because a clean comparison tool can amplify my attachment to the logic of the matrix if I forget that the underlying frame may still be unstable.',
              'In that sense, the Pugh chart functioned both as a strength and as a potential trap, unless it stayed connected to reframing and later testing.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would use Pugh charts only after I can state the framed opportunity and its criteria clearly enough that a disagreement about the matrix is not really a hidden disagreement about the problem.',
              'I would also pair the chart with one explicit rebuttal check: what result, test, or observation would make us reopen the matrix rather than defend it.',
              'My practical lesson is that a Pugh chart should narrow concepts, but it should never be allowed to close the argument by itself.',
            ],
          },
        ],
      },
      {
        project: 'CIV102',
        phaseCode: 'C',
        claimHeadline: 'FOS Comparison Tables Should Be Used to Converge Iterations, Not to Declare the Bridge Solved.',
        summary:
          'The grounds are the before-and-after FOS tables across the bridge iterations. The lesson is that these tables were excellent for converging the analytical design, but they were not enough to warrant full confidence in the built bridge once splice reliability entered the problem.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'Design 0 to Design 1, Design 1 to Design 2, and later tables all compared the same failure modes and recorded how the controlling mode changed after each design move.',
              'Those tables justified major decisions such as doubling the top flange, increasing height, reducing diaphragm spacing, removing the bottom flange, reducing web spacing, and finally accepting a lower but buildable bridge.',
              'The final built bridge failing at 580 N rather than 1367 N is the strongest rebuttal to any claim that the convergence tables alone had closed the argument.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'In this project, the FOS comparison tables acted as a Pugh-like converging CTMF even though they were not formatted as a classic product-comparison matrix.',
              'Within FDCR, they belong in Converging because they were the main tool for deciding whether the next bridge iteration should be kept, modified, or abandoned.',
              'They functioned by making the governing mode and tradeoff shift visible after each design change.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'This CTMF shaped the bridge by turning each iteration into an argument about the current governing weakness instead of a vague attempt to make the bridge stronger everywhere.',
              'My connection to it is strong because it aligns with the way I naturally read design decisions: I want to know what changed, why it changed, and what the new limiting condition became.',
              'The risk is that this style of convergence feels so rational that it can hide what is not yet represented in the table.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was that the FOS tables prevented random tweaking and gave each iteration a defensible reason to exist.',
              'What also worked was that they exposed overdesign, which justified removing wasted material such as the bottom flange rather than only adding more material everywhere.',
              'What failed was that the convergence logic remained more complete for global section behavior than for local splice reliability, so the built bridge still had a weak condition that the final tables did not force to the foreground.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF fits my preference for explicit, analyzable comparison and for decisions that can be justified through visible criteria rather than intuition alone.',
              'It also exposes the downside of that preference, because a very clean convergence structure can make me underweight what is not yet in the matrix.',
              'For me, this CTMF is therefore both a natural strength and a place where I need an explicit countermeasure against overtrusting numerical convergence.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would add one explicit local-reliability row to any convergence table when the final design depends on splices, adhesive interfaces, or placement tolerances.',
              'I would also treat test results as an opportunity to reopen the convergence logic rather than only to judge whether the final bridge â€œpassedâ€ or â€œfailed.â€',
              'My practical lesson is that convergence tables should decide the next iteration, not serve as proof that the built structure is already fully understood.',
            ],
          },
        ],
      },
    ],
  },
   {
    slug: "pugh-chart-praxis-i",
    title: 'Pugh Chart',
    stage: 'Converge',
    stageCode: 'C',
    subtext: 'Used pairwise comparison and two Pugh-chart passes in Praxis I to eliminate weak concepts early and identify which surviving ones still needed testing.',
    overview: 'A Pugh chart compares concepts against a datum through explicit criteria, though in Praxis I it worked less as a final verdict than as staged convergence: first eliminating weak concepts, then turning unresolved tradeoffs into a testing agenda.',
    whyItMatters: 'In Praxis I, it mattered because it removed the needle-straw concept early and showed that the water opener, rubber tab, and slider still needed evidence rather than an immediate winner.',
    evidence: [],
    application: 'I use Pugh charts to make concept narrowing traceable, especially when the correct result is not yet "choose the winner" but "decide what must be tested next."',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'C',
        claimHeadline: 'In Praxis I, the Pugh chart staged convergence by eliminating unjustifiable concepts early and turning unresolved tradeoffs into a testing plan.',
        summary:
          'In Praxis I, the Pugh chart did not function as a final verdict. It converted stakeholder-informed criteria and concept comparisons into a staged narrowing process: the first pass removed the needle-straw concept, while the second showed enough uncertainty that the water opener, rubber tab, and slider had to be prototyped and tested before one could be recommended honestly.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis I, the Pugh chart mattered because it changed what happened next in the project: it removed the least defensible concept early, kept the remaining credible concepts in play, and made unresolved criteria explicit enough that our team had to gather more evidence before recommending a final design.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'A Pugh chart is a converging CTMF that compares concepts against a datum through explicit criteria so concept elimination and remaining uncertainty can be judged more systematically.',
              'In Praxis I, it mattered because once stakeholder analysis and divergence had widened the frame and generated distinct mechanism families, the project needed a disciplined way to narrow concepts without pretending the evidence was already complete.',
            ],
          },
          {
            title: 'How I Used It In Praxis I',
            bullets: [
              'The pairwise comparison matrix in Appendix A served as the first convergence filter by surfacing the practical claims and rebuttals behind each concept before those judgments were formalized in the Pugh charts.',
              'Pugh Chart Version 1 compared concepts against the control using high-level criteria such as noise, edge safety, and food safety, and it was strong enough to eliminate the needle-straw because its sharpness, force, accessibility, and contamination risks were already difficult to defend.',
              'Pugh Chart Version 2 then widened the criteria to include liquid loss, volume, weight, and food safety, which did not identify a winner so much as show where uncertainty still remained across the water opener, rubber tab, and slider.',
            ],
            calloutTitle: 'Convergence Path',
            callouts: [
              'The pairwise comparison prepared the claims and requirement-linked concerns that the formal chart later organized.',
              'Version 1 removed the needle-straw early.',
              'Version 2 narrowed the field to the water opener, rubber tab, and slider and made clear that testing, not further scoring alone, had to decide between them.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/praxis1-pairwise-matrix.png',
                alt: 'Praxis I full pairwise comparison matrix comparing the needle-metal straw, water opener, slider, and rubber tab concepts across safety, accessibility, portability, manufacturability, contamination risk, and noise-related concerns.',
                caption:
                  'The pairwise comparison matrix was the first convergence filter in Praxis I. It recorded the practical case for and against each concept and gave our team the pros-cons basis that Pugh Chart Version 1 later formalized into criteria-based judgments.',
                imageClassName: 'object-contain bg-white p-4',
                frameClassName: 'aspect-[26/10] bg-white',
                figureClassName: 'xl:col-span-2',
                sizes: '100vw',
              },
              {
                src: '/context-evidence/raw/praxis1-pugh-chart-v1.png',
                alt: 'Praxis I Pugh Chart Version 1 comparing candidate designs against the control using high-level criteria such as noise, edge safety, and food safety.',
                caption:
                  'Pugh Chart Version 1 translated the pairwise reasoning into explicit plus, neutral, minus, and uncertain judgments against the control, and it was strong enough to remove the needle-straw because its accessibility, sharpness, force, and contamination risks were already difficult to defend.',
                imageClassName: 'object-contain bg-white p-4',
                frameClassName: 'aspect-[24/10] bg-white',
                figureClassName: 'xl:col-span-2',
                sizes: '100vw',
              },
              {
                src: '/context-evidence/raw/praxis1-pugh-chart-v2.png',
                alt: 'Praxis I Pugh Chart Version 2 comparing the water opener, slider, and rubber-tab concepts against the control across criteria including noise, liquid loss, volume, weight, and food safety.',
                caption:
                  'Pugh Chart Version 2 expanded the criteria to include liquid loss, volume, weight, and food safety, and it exposed how much still remained unresolved, which is why the water opener, rubber tab, and slider advanced to prototype testing instead of being settled by the chart alone.',
                imageClassName: 'object-contain bg-white p-4',
                frameClassName: 'aspect-[24/10] bg-white',
                figureClassName: 'xl:col-span-2',
                sizes: '100vw',
              },
            ],
          },
          {
            title: 'What It Generated',
            bullets: [
              'The chart generated early elimination of the needle-straw, a narrower second comparison among the water opener, rubber tab, and slider, and a testing agenda for the remaining uncertainties.',
              'It kept the surviving concepts in play without forcing premature commitment.',
              'The unresolved question marks in Version 2 showed that noise, liquid loss, hygiene, and usability still required prototype evidence before a final recommendation could be defended.',
            ],
          },
          {
            title: 'Its Limitation',
            bullets: [
              'The Pugh chart could organize comparison, though it could not resolve uncertainty on its own. In Praxis I, Version 2 still contained too many unknowns to support a final recommendation.',
              'It also could not test whether the project\'s physical explanation of the sound event was fully correct, since a concept could still score well while the team was working inside a weakened frame.',
              'Later measurement therefore mattered because only testing could show whether the surviving concepts actually performed better on the criteria that mattered.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/praxis1-converging-acoustic-comparison.png',
                alt: 'Praxis I acoustic impulse comparison between the control pull-tab can and the slider can over time.',
                caption:
                  'This later acoustic result shows the limit of the chart: the Pugh comparison narrowed the field, but measured evidence was still needed to show whether the surviving concept actually outperformed the control in practice.',
                imageClassName: 'object-contain bg-white p-4',
                frameClassName: 'aspect-[24/10] bg-white',
                figureClassName: 'xl:col-span-2',
                sizes: '100vw',
              },
            ],
          },
          {
            title: 'What I Learned / How I Would Use It Next Time',
            bullets: [
              'The main lesson was that a Pugh chart is strongest when it clarifies what must be tested next rather than pretending uncertainty has disappeared.',
              'In Praxis I, the honest reading of Version 2 was not that the team had found a winner, but that the remaining concepts had to be prototyped and measured before one could be trusted.',
              'Going forward, I would treat repeated question marks as an explicit trigger for testing and rebuild the chart if later evidence changes either the criteria or the problem frame.',
            ],
          },
        ],
      },
    ],
  },
    {
    slug: "pugh-chart-civ102",
    title: 'Pugh Chart',
    stage: 'Converge',
    stageCode: 'C',
    subtext:
      'Used six sequential bridge comparison charts to decide which design revision should survive, which should be rejected, and when strength had to be traded for buildability.',
    overview:
      'A Pugh chart is a converging CTMF because it lets successive design revisions be judged against explicit criteria rather than against intuition, and in CIV102 those criteria were the tracked factors of safety, the governing failure mode, and the predicted failure load.',
    whyItMatters:
      'It mattered because the project was not choosing between unrelated concept families, but deciding which revision path still deserved to continue once each design move changed the governing mode, the predicted load, or the bridge\'s manufacturability.',
    evidence: [
      'CIV102: six comparison charts tracked the bridge from Design 0 through Design 4.3, showing which revisions improved the governing mode, which exposed a new bottleneck, and which accepted lower strength to regain buildability.',
      'CIV102: the final built bridge failed at 580 N rather than the predicted 1367 N, which showed that the convergence structure was stronger for global section behavior than for splice-sensitive fabrication vulnerability.',
    ],
    application:
      'I use Pugh charts when a project evolves through successive revisions and the team needs a visible rule for deciding whether a change has improved the design overall rather than only one appealing part of it.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'C',
        claimHeadline:
          'Pugh Charts Should Make Each Design Revision Answer The Weakest Mode Before That Revision Is Allowed To Survive.',
        summary:
          'In CIV102, the six Pugh charts converged the bridge by asking one repeated question: after each design move, had the weakest condition improved enough to justify keeping that revision? That made the charts useful for more than ranking stronger-looking options, because they recorded when a change truly improved the bridge, when it merely shifted the weakness elsewhere, and when analytical strength had to be sacrificed to regain buildability. Their limit was not poor organization, but false completeness: they converged the modeled bridge more fully than they represented splice-sensitive behavior in the built bridge.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In CIV102, the Pugh charts mattered because they turned six successive bridge revisions into a visible convergence chain rather than a blur of design changes.',
              'Each chart compared one design against the next using the same structural language: the factors of safety for each failure mode, the controlling mode, and the predicted failure load. That consistency made it possible to ask the same converging question after every move: did this revision improve the bridge where it was weakest?',
              'The final test exposed the boundary of that logic. The charts converged the analytical bridge clearly, but they did not represent splice reliability with equal force, so the built bridge still failed for a more local reason than the charts had foregrounded.',
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'A Pugh chart is a converging CTMF because it compares alternatives against explicit criteria rather than against intuition or personal preference, and in CIV102 those criteria were the tracked factors of safety, the governing failure mode, and the predicted failure load.',
              'What mattered was not that the team produced six charts for the sake of documentation, but that each chart recorded whether a revision had actually improved the bridge overall or had merely shifted weakness from one mode to another.',
              'That is why this CTMF belongs in Converging. The charts were used to decide whether a revision should be kept, revised again, or rejected once the bridge had to balance strength, material use, and manufacturability at the same time.',
            ],
          },
          {
            title: 'What I Used The CTMF For In CIV102 / How It Actually Influenced The Project',
            calloutTitle: 'What each chart decided',
            callouts: [
              'Pugh 1: the original bridge could not survive, so the top flange had to be strengthened.',
              'Pugh 2: improving height and flange layering helped some modes but made web shear buckling the new bottleneck.',
              'Pugh 3: tighter diaphragm spacing solved that bottleneck analytically and produced the strongest design so far.',
              'Pugh 4: the bottom flange was removed because buildability had become more important than preserving every bit of analytical strength.',
              'Pugh 5: web spacing was tuned to balance buckling reserves, even though predicted load did not increase.',
              'Pugh 6: the bridge accepted a lower analytical load in exchange for the first genuinely buildable pi-beam revision.',
            ],
            bullets: [
              'I used the Pugh charts to read each bridge revision as a claim about the weakest part of the design rather than as a vague attempt to make the whole bridge stronger, which made convergence legible because every major change had to show what governing condition it improved, what new condition it exposed, or what tradeoff it accepted.',
              'The first chart, [[fig:01]], compared Design 0 with Design 1 and showed that the starting bridge was nowhere near viable: thin-plate buckling case 1 governed at a factor of safety of 0.597 and predicted failure sat at only 260 N. Doubling the top flange raised the predicted load to 668 N and shifted the controlling mode to compression, so the revision was worth keeping because it improved the bridge as a whole rather than inflating one isolated number.',
              'The second chart, [[fig:02]], made the convergence logic harder and more useful, because although Design 2 improved tension, compression, and shear, the predicted failure load still fell from 668 N to 622 N once web shear buckling became the new governing condition, which showed that a revision could look stronger in several places while still becoming worse overall if it created a weaker bottleneck elsewhere.',
              'The third chart, [[fig:03]], justified the diaphragm-spacing revision, where tightening the spacing raised the thin-plate shear buckling factor of safety from 1.556 to 5.30 and pushed predicted failure to 2120 N, making this the clearest analytical success in the sequence because the governing weakness had been identified correctly and then improved directly.',
              'The fourth chart, [[fig:04]], captured the key strength-for-buildability tradeoff. Removing the bottom flange reduced predicted load from 2120 N to 1861 N, though the bridge remained structurally credible while shedding material and moving toward a buildable pi-beam, so the chart mattered because it made that sacrifice intelligible instead of letting it read as simple regression.',
              'The fifth chart, [[fig:05]], showed that convergence was not only about raising the headline load. Design 4.2 kept the predicted load at 1861 N while reducing the gap between buckling case 1 and buckling case 2, which meant the revision improved structural balance even though the top-level capacity number stayed the same.',
              'The sixth chart, [[fig:06]], recorded the first full manufacturability concession. Design 4.3 dropped from 1861 N to 1319 N by reducing top-flange layers and height, though it finally produced a bridge that could fit on the matboard, so this moment marks the point where convergence stopped asking for the strongest bridge on paper and started asking for the strongest bridge that could actually be built.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-pugh-1.png',
                alt: 'CIV102 Pugh Chart 1 comparing Design 0 and Design 1 across all tracked failure modes.',
                caption:
                  'Pugh Chart 1 compares Design 0 against Design 1. This chart shows why the original bridge could not survive and why doubling the top flange was the first justified revision.',
                label: 'Fig. 01',
                refKey: '01',
                imageClassName: 'object-contain bg-white p-3',
              },
              {
                src: '/context-evidence/raw/civ102-pugh-2.png',
                alt: 'CIV102 Pugh Chart 2 comparing Design 1 and Design 2 across all tracked failure modes.',
                caption:
                  'Pugh Chart 2 compares Design 1 against Design 2. It matters because stronger values in several modes did not make the bridge better overall once web shear buckling became the new governing condition.',
                label: 'Fig. 02',
                refKey: '02',
                imageClassName: 'object-contain bg-white p-3',
              },
              {
                src: '/context-evidence/raw/civ102-pugh-3.png',
                alt: 'CIV102 Pugh Chart 3 comparing Design 2 and Design 3 across all tracked failure modes.',
                caption:
                  'Pugh Chart 3 compares Design 2 against Design 3. Tightening diaphragm spacing dramatically improved thin-plate shear buckling and pushed predicted failure to 2120 N, making this the strongest analytical design in the sequence.',
                label: 'Fig. 03',
                refKey: '03',
                imageClassName: 'object-contain bg-white p-3',
              },
              {
                src: '/context-evidence/raw/civ102-pugh-4.png',
                alt: 'CIV102 Pugh Chart 4 comparing Design 3 and Design 4.1 across all tracked failure modes.',
                caption:
                  'Pugh Chart 4 compares Design 3 against Design 4.1. This chart captures the bottom-flange tradeoff, where the bridge lost some analytical capacity while becoming materially leaner and more buildable.',
                label: 'Fig. 04',
                refKey: '04',
                imageClassName: 'object-contain bg-white p-3',
              },
              {
                src: '/context-evidence/raw/civ102-pugh-5.png',
                alt: 'CIV102 Pugh Chart 5 comparing Design 4.1 and Design 4.2 across all tracked failure modes.',
                caption:
                  'Pugh Chart 5 compares Design 4.1 against Design 4.2. Its importance lies in structural balance, since predicted load stayed constant while the buckling reserves became less wastefully uneven.',
                label: 'Fig. 05',
                refKey: '05',
                imageClassName: 'object-contain bg-white p-3',
              },
              {
                src: '/context-evidence/raw/civ102-pugh-6.png',
                alt: 'CIV102 Pugh Chart 6 comparing Design 4.2 and Design 4.3 across all tracked failure modes.',
                caption:
                  'Pugh Chart 6 compares Design 4.2 against Design 4.3. This is the clearest manufacturability concession in the series, because the bridge accepted a lower predicted load in exchange for becoming buildable.',
                label: 'Fig. 06',
                refKey: '06',
                imageClassName: 'object-contain bg-white p-3',
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The limitation was not that the charts compared the wrong global quantities, but that those quantities were still stronger representations of the modeled bridge than of the fabricated one.',
              'Compression, shear, buckling, and material overdesign could be tracked cleanly, while splice reliability, adhesive variability, cutting tolerance, and alignment sensitivity remained much less visible inside the convergence structure even though the bridge depended on those details physically.',
              'That limit became hardest to ignore in the final mismatch between prediction and test. After later optimizations the bridge was predicted at about 1367 N, though the built bridge failed around 580 N at the front splice, which showed that the charts had been strong enough to optimize the represented bridge without being complete enough to close the argument about the real one.',
              'The distinct lesson of this CTMF in CIV102 is that a clean comparison structure can still create false confidence if the compared criteria are much stronger for the represented bridge than for the fabricated bridge.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p3-img1.png',
                alt: 'CIV102 matboard layout for the final buildable bridge revision.',
                caption:
                  'This layout shows what the convergence structure did capture well: it eventually produced a bridge that could be cut and assembled from one sheet.',
                imageClassName: 'object-contain bg-white p-3',
              },
              {
                src: '/context-evidence/raw/civ102-failure.png',
                alt: 'CIV102 bridge collapsing during destructive testing.',
                caption:
                  'This image is the clearest rebuttal on the page, because the built bridge revealed a fabrication-sensitive governing condition that the charts had not represented with equal force.',
                imageClassName: 'object-contain bg-white p-3',
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for explicit comparison and for design decisions that can be defended through visible criteria, though CIV102 also showed the risk of that preference clearly, because once the comparison structure becomes clean it becomes easy to overtrust what the chart includes and underweight what it leaves out.',
              'What the project clarified for me was that good convergence is not only about choosing the strongest-looking revision, but about knowing whether the criteria still capture the condition that will actually govern the built artifact.',
              'That is what makes this CTMF different from calculations and simulation: its main risk is not generation failure, but false confidence in narrowing.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use the chart to decide the next revision rather than to declare the structure solved.',
              'Add an explicit local-reliability criterion whenever the design depends on splices, adhesive interfaces, or placement tolerances.',
              'Mark clearly when a revision improves the weakest mode, when it only redistributes reserve, and when it sacrifices strength to regain manufacturability, because those are different convergence moves and should not be blended together.',
              'Treat destructive testing as a chance to reopen the chart structure rather than as a final verdict on whether the bridge worked.',
              "My practical rule is: if the bridge's success depends on a fabrication detail, that detail must appear in the convergence chart before I trust the numerical result too much.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "weighted-decision-matrix",
    title: 'Weighted Decision Matrix',
    stage: 'Converge',
    subtext: 'Assigned quantified weights to design criteria and scored alternatives, providing a rigorous and transparent convergence process.',
    overview: 'Weighted decision matrices extend comparative evaluation by recognizing that not all criteria matter equally and that priorities should be made explicit.',
    whyItMatters: 'They force value judgments into the open and help a team explain why one tradeoff matters more than another.',
    evidence: [
      'Praxis I: aligned concept choice with the most critical usability and feasibility constraints.',
      'CIV102: reflected the same prioritization mindset in balancing mass against structural performance.',
      'Portfolio work: helped decide what content deserved visual emphasis and what should remain supporting material.',
    ],
    application: 'I use weighted matrices when tradeoffs are real, criteria importance differs, and the decision needs a stronger quantitative rationale.',
  },
  {
    slug: "verification-validation",
    title: 'Verification + Validation',
    stage: 'Converge',
    stageCode: 'C',
    subtext: 'Used testing to challenge the procedure, separate blended claims, and change which concept path remained strongest.',
    overview: 'Verification and validation are converging CTMFs when tests decide which claims, procedures, and concept paths deserve to remain in the final design argument.',
    whyItMatters: 'This CTMF keeps clean-looking numbers from being mistaken for trustworthy evidence when the test is still representing the phenomenon poorly.',
    evidence: [
      'Praxis II: splitting dexterity and temperature testing changed what counted as evidence, weakened the knob-turner path, and made the glove path more defensible.',
      'CIV102: physical bridge testing exposed where the analytical model stopped accounting for real splice vulnerability.',
    ],
    application: 'I use verification and validation whenever a project needs evidence that can challenge assumptions and test whether the procedure actually represents the use condition it claims to measure.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'C',
        claimHeadline: 'Verification And Validation Should Change The Design Argument When The First Procedure Misrepresents The Problem.',
        summary:
          'In Praxis II, verification and validation mattered because the first testing procedure misrepresented the winter-use problem, and correcting that procedure changed which concept path remained strongest. The project improved not when it collected more data, but when it stopped letting one weak procedure stand in for both thermal validation and dexterity verification.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis II, verification and validation mattered because the first testing procedure was too weak to represent sustained winter telescope use, and that weakness affected which concepts initially looked credible.',
              'Once dexterity and thermal retention were tested separately, the glove concept became more defensible because it could be judged against the real winter-use tradeoff rather than a blended and short-lived cold test. That shift changed convergence by weakening the knob-turner path and strengthening the glove path.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-graph-dexterity.png",
                alt: "Praxis II dexterity-performance graph comparing cold-weather task effects across conditions.",
                caption:
                  "This figure supports the core claim because dexterity had to become a distinct measured variable. The project improved once our team stopped assuming that any change in hand warmth automatically described usable telescope manipulation.",
              },
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Verification and validation is a converging CTMF used to decide whether concepts deserve to keep moving forward by testing both their measured performance and their fit to the real use conditions the project is trying to address. In Praxis II, it mattered because convergence only became defensible once warmth and usable dexterity were separated and judged as distinct questions instead of being blended into one weak result.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-graph-temp.png",
                alt: "Praxis II thermal-performance graph tracking temperature loss across test conditions.",
                caption:
                  "Thermal retention needed its own representation. Separating temperature evidence from dexterity evidence made the later convergence logic much more trustworthy.",
              },
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis II / How It Influenced The Project',
            calloutTitle: 'Where the procedure changed the argument',
            callouts: [
              'The cold-plunge setup did not hold the cold effect long enough, so the resulting dexterity data could not credibly stand in for prolonged outdoor winter use.',
              'Because that procedure was weak, our team had to split thermal retention from dexterity performance instead of claiming that one test captured both.',
              'That split changed convergence: the knob-turner weakened as a narrow manipulation solution, while the glove path strengthened because it could now be judged on both warmth and task performance more honestly.',
            ],
            bullets: [
              'I used verification and validation to decide whether the project\'s evidence deserved to shape convergence, because the first cold-plunge procedure produced data without representing the sustained winter condition the project actually needed to test. Once that weakness became clear, our team separated dexterity testing from temperature testing so that one procedure no longer carried two different claims.',
              'That change affected convergence directly. The knob-turner weakened once evaluation moved beyond one narrow manipulation task, while the glove became more defensible because it could be judged against the broader tradeoff between warmth, task performance, and usability. Adjacent examples such as delivery riders using handlebar muffs did not validate telescope use directly, though they did support the final multi-mode logic behind the glove.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-testing-heating-wires.webp",
                alt: "Praxis II prototype testing of the glove heating wires during development.",
                caption:
                  "Verification happened at the subsystem level as well. Our team was not only judging ideas in the abstract; it was checking whether wire placement, heat delivery, and construction details could support the larger claim being made about the glove.",
                imageClassName: "object-contain bg-white p-3",
                frameClassName: "bg-white",
              },
              {
                src: "/context-evidence/raw/praxis2-internal-schematic.png",
                alt: "Praxis II internal schematic of the final GRIPPy glove architecture.",
                caption:
                  "The internal architecture changed because the evidence changed. The design moved toward a controlled multi-mode glove, not just a hotter glove, because the revised procedure supported warmth-by-default and dexterity-on-demand as the more honest response to the use pattern.",
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The limitation in Praxis II was not the absence of data, but the fact that early procedures were too weak for the conclusions being drawn from them, since the cold-plunge setup did not sustain the condition long enough to stand in for real winter telescope use, and analog validation from delivery riders, while useful for supporting the glove’s modal logic, could not prove suitability for the fine manipulations astronomy actually requires.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-physical-prototype.webp",
                alt: "Praxis II physical prototype of the GRIPPy glove laid out for inspection.",
                caption:
                  "The prototype itself helps make the limitation concrete. Physical presence does not automatically mean validated performance; the artifact still had to be judged through procedures that actually represented its intended winter use.",
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'Praxis II revealed a weakness in my design process: I can grant too much authority to measured results before I have judged whether the procedure behind them is actually trustworthy.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-backside-prototype.webp",
                alt: "Back side of the Praxis II physical prototype showing its built construction details.",
                caption:
                  "This prototype view supports the reflective point: once an artifact becomes real, trust depends not on how neat the numbers look, but on whether the procedure actually captures the conditions that matter to the built object in use.",
              },
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Define verification and validation separately before testing begins whenever one procedure is at risk of being used to justify two different claims.',
              'Label evidence as in-scope, analog, or convenience evidence before using it to support convergence, so adjacent examples like delivery riders are used honestly rather than overstated.',
              'State in advance what result would force our team to reopen the test logic. In Praxis II, the short-lived cold effect should have triggered that rule immediately.',
              'My practical rule is: if one procedure is being used to justify two different claims, the procedure should be split before the results are trusted.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-high-dexterity-prototype.webp",
                alt: "Praxis II high-dexterity prototype state with fingertips more exposed for manipulation.",
                caption:
                  "The future-use lesson is procedural as much as physical. A state like this should be tested for the claim it is actually meant to support, rather than folded into one broad and underspecified test of overall success.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "prototyping-and-cad",
    title: 'Prototyping & CAD',
    stage: 'Represent',
    subtext: 'Created low and high-fidelity prototypes using CAD simulations and physical models to validate design decisions and communicate intent.',
    overview: 'Prototyping and CAD make ideas testable and legible, moving the design from abstraction into something that can be evaluated, explained, and improved.',
    whyItMatters: 'Representation is where assumptions become visible. Models reveal feasibility, communicate intent, and create better feedback loops.',
    evidence: [
      'Praxis I: physical and conceptual modeling helped compare mechanisms and communicate the selected design direction.',
      'CIV102: bridge construction and testing exposed the difference between calculated behavior and fabricated reality.',
      'Portfolio work: this site itself acts as a representational artifact that translates process into an accessible experience.',
    ],
    application: 'I use prototyping and CAD to turn design reasoning into forms that can be tested, critiqued, and shared with collaborators or reviewers.',
  },
];




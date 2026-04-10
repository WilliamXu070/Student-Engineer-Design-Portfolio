export interface ProjectDetail {
  title: string;
  course: string;
  overview: string;
  criteria: string[];
  ctmfRefs: string[];
  process: {
    refinement: string;
    generation: string;
    assessment: string;
    reflection: string;
  };
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "praxis-i": {
    title: "Silent Can Opener",
    course: "Praxis I",
    overview: "A product design project investigating how to reduce the impulsive noise created when opening a carbonated soda can in quiet academic spaces without sacrificing accessibility, portability, or beverage integrity.",
    criteria: [
      "Strong peak-noise reduction during opening",
      "Minimal liquid loss and CO2 boil-off",
      "Portable and conceptually compatible with standard can use",
      "Accessible interaction with low force and low hand pressure",
      "Safe, hygienic contact around the drinking surface",
    ],
    ctmfRefs: [
      "stakeholder-mapping",
      "morphological-chart",
      "pugh-chart-praxis-i",
    ],
    process: {
      refinement: "The project first looked like a quieting problem around depressurization and external damping, but stakeholder analysis translated the NGOs into requirements that made portability, accessibility, safety, and beverage integrity non-negotiable alongside noise reduction.",
      generation: "Early design concepts included puncture vents, water damping, and tab attachments. The vented-versus-unvented result then weakened the original frame, which is why divergence only became genuinely useful after our team reopened what was actually causing the sound event.",
      assessment: "The final concept was not chosen just because it was final. The slider-based can earned recommendation by performing best against the explicit criteria, including a drop from 102 dB to 61 dB, lower liquid loss, lower hand pressure, and fewer gestures than the main alternatives.",
      reflection: "Praxis I showed me that a design process can converge cleanly while still failing at the level of framing. The strongest lesson was that evidence can require a move backward in FDCR before further convergence becomes meaningful.",
    }
  },
  "civ102-bridge": {
    title: "The Bifrost",
    course: "CIV102",
    overview: "A structural engineering project to design, construct, and test a buildable matboard bridge that could carry a moving 400 N train while balancing buckling resistance, material efficiency, and manufacturability.",
    criteria: [
      "Carry a moving 400 N train across a 1,200 mm span",
      "Fit within one 813 mm by 1,016 mm sheet of 1.27 mm matboard and two tubes of contact cement",
      "Keep a horizontal deck with at least 100 mm of deck width below the maximum track height",
      "Balance strength, buckling resistance, material use, and manufacturability",
    ],
    ctmfRefs: [
      "challenge-assumptions",
      "calculations-simulation",
      "pugh-chart-civ102",
    ],
    process: {
      refinement: "What looked like a straightforward strength-maximization problem became a tighter FDCR framing problem once moving-load effects, matboard limits, and fitting constraints were treated as real design pressures rather than background conditions.",
      generation: "The project concentrated on a simple pi-beam form instead of truss or trapezoidal options, then used calculations and simulation to iterate against the current governing failure mode rather than adding material everywhere.",
      assessment: "Analytical convergence raised the design from roughly 260 N in Design 0 to a final predicted capacity of 1367 N, but physical testing exposed a front-splice failure at 580 N and revealed that local manufacturing uncertainty had become the real governing weakness.",
      reflection: "CIV102 reinforced that engineering credibility depends on more than analytical strength. A design can converge neatly in the calculations and still underperform if splice sensitivity, fabrication tolerance, and local reliability are not represented strongly enough.",
    }
  },
  "praxis-ii": {
    title: "Convertible Heated Glove System",
    course: "Praxis II",
    overview: "A winter-astronomy design project that identified the real issue as loss of fine telescope manipulability in the cold, then converged on a convertible heated glove system that managed the warmth-versus-precision tradeoff more honestly.",
    criteria: [
      "Preserve task performance during real winter telescope micro-tasks",
      "Maintain usable hand warmth without breaking fingertip control",
      "Respect low-light use, portability, and diverse existing telescope workflows",
      "Support controlled switching into a higher-dexterity mode when precision tasks demand it",
    ],
    ctmfRefs: [
      "root-cause-analysis",
      "verification-validation",
      "biomimicry",
    ],
    process: {
      refinement: "The project started as a broad winter-astronomy usability problem, but stakeholder conversations and direct telescope interaction narrowed it toward a more precise mismatch between cold-impaired hands and the fine manipulations telescope use demands.",
      generation: "Multiple intervention families were explored, including environment systems, software or error-mitigation ideas, telescope attachments, and glove concepts, before community fit and task logic pushed the project toward preserving user dexterity directly.",
      assessment: "Testing had to develop in stages because the initial cold-plunge setup only produced 1 to 3 seconds of meaningful impairment. Once dexterity and thermal questions were separated and then recombined more carefully, the project justified finger-focused heating, dropped the knob-turner, and converged on the final multi-mode glove logic.",
      reflection: "Praxis II made one design lesson explicit: rigor becomes harmful when it hardens the scope or the criteria too early. The project improved once our team reopened both framing and testing, focused on the real dexterity bottleneck, and accepted that some tasks would still require controlled shifts between warmth and precision.",
    }
  },
  "portfolio": {
    title: "Engineering Design Portfolio",
    course: "Portfolio",
    overview: "A reflective portfolio that synthesizes coursework, design decisions, and growth across Praxis I, CIV102, and Praxis II into one coherent narrative.",
    criteria: [
      "Present projects as evidence of developing engineering judgment",
      "Balance visual communication with technical clarity",
      "Create continuity across multiple courses and project scales",
      "Show reflection, iteration, and personal growth rather than only final outcomes",
    ],
    ctmfRefs: [
      "systems-thinking",
      "brainstorming",
      "prototyping-and-cad",
    ],
    process: {
      refinement: "The challenge was not only collecting previous work, but deciding what kind of story the portfolio should tell. That required identifying recurring themes, selecting the strongest evidence, and shaping the experience around reflection rather than simple documentation.",
      generation: "Different structures for sequencing projects, reflections, and visual moments were explored before settling on a format that lets the viewer move between atmosphere, evidence, and detailed case studies.",
      assessment: "Design choices were evaluated according to readability, narrative coherence, and how effectively they communicated both process and capability. The final direction favored clarity and intention over adding more content for its own sake.",
      reflection: "Building the portfolio turned past assignments into a clearer picture of how my design thinking has changed. It made growth visible by connecting individual projects to broader habits of iteration, communication, and systems thinking.",
    }
  },
  "beyond": {
    title: "Evolving Designer",
    course: "Beyond",
    overview: "A forward-looking project page that frames the next phase of growth: carrying lessons from early coursework into more ambitious engineering, collaboration, and design opportunities.",
    criteria: [
      "Identify strengths worth deepening through future work",
      "Recognize skill gaps that need deliberate practice",
      "Set a direction that remains adaptable as new opportunities appear",
      "Translate reflection into concrete next steps",
    ],
    ctmfRefs: [
      "systems-thinking",
      "stakeholder-mapping",
      "weighted-decision-matrix",
    ],
    process: {
      refinement: "Looking forward required separating short-term goals from longer-term values. The focus shifted from predicting one exact path to defining the kinds of problems, teams, and responsibilities worth moving toward.",
      generation: "Possible next steps were considered across coursework, extracurriculars, technical skill-building, and portfolio development. Each option was useful only if it contributed to a stronger design practice rather than a disconnected checklist.",
      assessment: "Future directions were weighed by learning potential, alignment with current interests, and the opportunity to practice both technical rigor and human-centered thinking.",
      reflection: "This final point on the timeline is intentionally open-ended. It marks the transition from documenting completed projects to shaping the kind of engineer and designer I want to become next.",
    }
  }
};

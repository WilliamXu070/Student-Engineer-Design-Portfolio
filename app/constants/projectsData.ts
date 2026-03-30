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
    title: "Mechanical Pencil Improvement",
    course: "Praxis I",
    overview: "To develop a mechanical pencil that is capable of using different lead sizes while maintaining the ease of use and affordability of current mechanical pencils.",
    criteria: [
      "Compatible with at least two different common lead sizes",
      "Not exceed 11.0 grams in mass",
      "Between 7mm and 15mm in diameter",
      "Intuitive to use with less than 5 guidelines",
      "Retail price under 10.00 CAD",
      "Between 130mm and 150mm in length"
    ],
    ctmfRefs: [
      "stakeholder-mapping",
      "requirements-matrix",
      "morphological-chart",
      "pugh-chart",
    ],
    process: {
      refinement: "The design brief which we received clearly identified the problem of mechanical pencils accepting only one lead size, but required clarification on the main stakeholders and several constraints. We added drafters and artists as new stakeholders, who often need to use different lead sizes for different purposes.",
      generation: "In order to generate divergent solutions, we formulated a morphological chart of the functional decomposition of a mechanical pencil, and various methods of meeting the functions. We came up with solutions ranging from lead rollers to grinders... However, the addition of a new stakeholder required regenerating solutions.",
      assessment: "Using a Pugh chart, we compared the relative performance of each candidate solution. In our first iteration, we used a standard Bic Matic... For the second iteration of the Pugh chart, we chose the multi-barreled pencil as the reference design, as it was the closest to existing products. We ultimately selected the modification design as our solution because it builds upon the proven design of current mechanical pencils, meaning that there are fewer variables which could result in its failure.",
      reflection: "This project was a first introduction to how working as an engineer might be like, in the sense that I was working collaboratively with other members and designing a potential product. It shows the importance of reiteration within each step of the design of a product, and the importance of collaborative working through constructive criticism."
    }
  },
  "civ102-bridge": {
    title: "Matboard Bridge Design",
    course: "CIV102",
    overview: "A structural engineering project to design, construct, and test a matboard bridge supporting a 400N point load.",
    criteria: [
      "Maximum mass of 100g",
      "Span at least 1000mm",
      "Must withstand 400N point load",
    ],
    ctmfRefs: [
      "requirements-matrix",
      "systems-thinking",
      "weighted-decision-matrix",
      "prototyping-and-cad",
    ],
    process: {
      refinement: "Understood the specific constraints of the matboard material properties.",
      generation: "Iterated through Pi-beam, box-girder, and truss bridge variants before selecting a simplified box-girder with robust diaphragms.",
      assessment: "Evaluated failure modes including shear, flexural yielding, and plate buckling using structural analysis formulas.",
      reflection: "This project highlighted the gap between theoretical calculations and physical imperfections in construction."
    }
  },
  "praxis-ii": {
    title: "Systems Intervention Study",
    course: "Praxis II",
    overview: "A systems-focused design project centered on understanding stakeholders, mapping interdependencies, and identifying leverage points for a practical intervention.",
    criteria: [
      "Define a clear systems boundary and stakeholder ecosystem",
      "Ground the proposal in observed needs and realistic constraints",
      "Compare multiple intervention directions before selecting one",
      "Communicate the rationale, tradeoffs, and anticipated impact clearly",
    ],
    ctmfRefs: [
      "stakeholder-mapping",
      "systems-thinking",
      "scamper-method",
      "weighted-decision-matrix",
    ],
    process: {
      refinement: "The initial framing required translating a broad challenge into a tractable intervention space. That meant clarifying who experiences the system most directly, where friction appears, and which constraints would shape any realistic proposal.",
      generation: "Multiple intervention directions were explored through structured ideation, systems mapping, and discussion. Rather than settling on the first promising concept, the project emphasized generating alternatives that responded to different stakeholders and scales of change.",
      assessment: "Concepts were weighed against feasibility, stakeholder fit, clarity of implementation, and potential effect within the larger system. This created a more disciplined basis for choosing a direction than intuition alone.",
      reflection: "Praxis II reinforced that design is rarely about a single object in isolation. The more useful lens was understanding relationships, incentives, and the consequences that emerge when a system is changed.",
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

import { Ctmf } from "../types";

export const PROJECTS: Ctmf[] = [
  {
    slug: "challenge-assumptions",
    title: 'Challenge Assumptions',
    stage: 'Frame',
    stageCode: 'F',
    subtext: 'Questioned whether complexity, extra material, and analytical neatness were actually the right structural commitments before optimization hardened.',
    overview: 'Challenge assumptions is a framing CTMF that asks which starting beliefs are justified, which are only convenient simplifications, and which are quietly steering the project toward a weaker definition of success.',
    whyItMatters: 'In CIV102, it mattered because the team first had to decide what kind of bridge was worth optimizing before calculations and convergence could mean anything.',
    evidence: [
      'CIV102: questioned whether more complex bridge forms were actually better than a simple, analyzable pi-beam and later exposed that splice reliability had been underframed as a structural issue.',
      'Praxis I: the same mindset became critical once evidence showed that can-opening noise was not mainly being driven by depressurization.',
    ],
    application: 'I use this CTMF early to test whether the project is leaning on inherited defaults, and again after testing when the real artifact behaves differently from the model.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'F',
        claimHeadline: 'Challenge Assumptions Should Decide What Kind Of Bridge Is Worth Optimizing Before The Model Takes Over.',
        summary:
          'In CIV102, challenging assumptions mattered because it shaped the bridge logic before optimization hardened. It helped the team reject unnecessary complexity and visible overdesign early, but the built bridge later showed that local splice reliability had not been challenged with the same seriousness as global section behavior.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In CIV102, challenging assumptions mattered because it helped decide what kind of bridge was worth committing to before calculations began to drive the project. The team challenged complexity and overdesign early, but the built bridge later showed that splice reliability had not been framed strongly enough as a structural issue.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p3-img2.png',
                alt: 'CIV102 team holding the completed pi-beam style bridge.',
                caption:
                  'The final bridge form supports the framing claim. One of the first useful assumption challenges in CIV102 was deciding that a simpler pi-beam direction was a better structural commitment than a more visually ambitious but harder-to-control alternative.',
              },
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Challenge assumptions is a framing CTMF that asks which starting beliefs are justified, which are only convenient shortcuts, and which are quietly shaping the project in misleading ways.',
              'In CIV102, it was needed because optimization could have started too early around assumptions like more complexity means more strength, more material means more safety, or analytically clean means structurally trustworthy.',
              'Before the bridge could be generated and converged well, the team first had to decide what counted as a credible structural direction under the real assignment constraints.',
            ],
          },
          {
            title: 'How I Used It In CIV102',
            bullets: [
              'I first used this CTMF when the team chose the simpler pi-beam or box-girder direction over more complex bridge forms, because we judged that analytical clarity and constructability mattered more than structural flourish. That was a framing decision, not just a style preference.',
              'I used it again when the FOS outputs showed that parts of the section, especially the bottom flange, were carrying more material than the governing weakness justified. That made overdesign visible as an assumption rather than as harmless insurance.',
              'In that sense, this CTMF shaped both the bridge family and the bridge logic. It helped the team commit to a structurally legible form and avoid preserving material simply because it felt safer to leave it in.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p6-img3.png',
                alt: 'CIV102 cross-section sketch of the chosen pi-beam geometry.',
                caption:
                  'This section sketch supports the first major use of the CTMF: the team challenged the assumption that a more complicated bridge family was necessary and instead committed to a simpler geometry that could be analyzed and built more reliably.',
              },
              {
                src: '/context-evidence/raw/civ102-p5-img1.png',
                alt: 'CIV102 Design 0 factor-of-safety output showing thin-plate buckling as the governing weakness.',
                caption:
                  'The early FOS output shows assumption-challenging moving from bridge family to material logic. Once the governing weakness became visible, extra material could be questioned rather than preserved by default.',
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The main limitation was not the CTMF itself, but how selectively it was applied. In CIV102, it was used strongly on bridge family and section-level efficiency, but not strongly enough on local splice vulnerability.',
              'The clearest evidence is that the final bridge was predicted to fail at about 1.367 kN, but the built bridge failed at about 580 N at the front splice. That means an important assumption about what would govern the real bridge had remained underchallenged during framing.',
              'The deeper lesson is that a bridge can be framed intelligently at the level of global structural behavior while still carrying a fabrication-sensitive weakness that should have been treated as structural much earlier.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p14-img1.png',
                alt: 'CIV102 layout-fitting output showing that a stronger analytical bridge could not fit within the sheet constraints.',
                caption:
                  'This fitting failure makes one hidden assumption visible: "strongest analytically" was not enough if the bridge could not fit the matboard and splice constraints of the assignment. Manufacturability should have been challenged with the same seriousness as structural performance.',
              },
              {
                src: '/context-evidence/raw/civ102-splice-failure.jpg',
                alt: 'CIV102 bridge highlighting the front splice failure region after testing.',
                caption:
                  'This is the strongest rebuttal on the page. The built bridge exposed the assumption that remained underchallenged: the analytical model was much stronger on global section behavior than on local splice reliability.',
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for engineering that is explicit, analyzable, and defensible, which is why it helped me reject unnecessary structural complexity early.',
              'CIV102 also exposed the risk in that preference: I challenge assumptions most naturally when they are visible in the model, but not as automatically when they hide in fabrication details like splices, adhesive behavior, and alignment.',
              'The deeper lesson for me was that good framing has to decide what kind of structural truth matters before optimization begins. If a local fabrication condition can become governing later, it should not be treated as a secondary construction issue early on.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use this CTMF twice: once before committing to a structural family, and again after the manufacturable layout is fixed.',
              'Challenge splice assumptions, adhesive assumptions, and alignment assumptions with the same seriousness used for bending and buckling assumptions.',
              'Treat any local fabrication detail that the final recommendation depends on as part of framing, not as something to leave until testing reveals it too late.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "stakeholder-mapping",
    title: 'Stakeholder Analysis',
    stage: 'Frame / Represent',
    stageCode: 'F/R',
    subtext: 'Used primary stakeholder conversations to widen the can-opening problem beyond noise alone and translate those concerns into explicit requirements.',
    overview: 'Stakeholder analysis identifies who is affected by a design, who constrains implementation, and how those pressures should be translated into requirements before the project narrows too quickly around one metric.',
    whyItMatters: 'In Praxis I, it mattered because primary student conversations surfaced spill control, beverage disturbance, and awkward interaction as real concerns, which expanded the problem beyond noise alone.',
    evidence: [],
    application: 'I use stakeholder analysis early to turn stakeholder pressure into measurable requirements, then revisit it after testing to check whether the project is still protecting what those users actually cared about.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'F/R',
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
              'Stakeholder analysis is a framing / representing CTMF that identifies who is affected by a design, what they care about, and how those concerns should be translated into requirements before the project narrows too quickly around one metric.',
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
    application: 'I use requirement matrices to keep decisions traceable, especially when multiple criteria compete and the team needs a clear basis for tradeoffs.',
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
      'Praxis II: opened two legitimate intervention pathways, reducing dexterity demand or preserving user dexterity, before later convergence narrowed the project.',
    ],
    application: 'I use root cause analysis when a problem seems broad, ambiguous, or easy to misread from surface symptoms alone.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'F',
        claimHeadline: 'Root Cause Analysis Should Expose The Winter Human-Interface Breakdown Before The Project Collapses Into Generic Cold Discomfort.',
        summary:
          'In Praxis II, root cause analysis mattered because it stopped the team from treating winter discomfort as the problem and instead identified a more actionable breakdown: cold-weather telescope use repeatedly forces astronomers into a tradeoff where warmth, fine manipulation, and observing continuity cannot all be preserved at once.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis II, root cause analysis mattered because it stopped the team from treating winter discomfort as the real problem and instead exposed a more actionable breakdown: telescope observing in the cold repeatedly forces users to trade away either warmth or fine hand control.',
              'The strongest result of this CTMF was not the glove itself. It was the reframing that revealed two real intervention pathways: reduce the dexterity demand of telescope operation, or preserve the userï¿½s dexterity under winter conditions.',
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
              'Root cause analysis is a framing CTMF used to move past surface symptoms and identify the interacting causes that a design should actually respond to.',
              'In Praxis II, it was needed because ï¿½astronomers are uncomfortable in winterï¿½ was too broad to guide engineering work. That description mixed together temperature, dexterity, workflow, equipment interaction, and general field discomfort without showing which of those was actually breaking telescope use.',
              'The CTMF therefore forced the team to ask more specific questions: why do hands get cold during observation, which tasks actually fail first, whether cold alone is enough to explain that failure, and whether the better intervention is on the telescope side or on the user side.',
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
              'RASC interview: existing heated gloves were described as ï¿½big thick thingsï¿½ that remove the dexterity needed for astronomy.',
              'RASC interview: users wanted fingertips free for ï¿½little fiddlyï¿½ controls and detailed adjustments such as focus and eyepiece handling.',
              'Preliminary proxy testing: glove use slowed the task much more than brief cold exposure alone, suggesting the bottleneck was a winter human-interface breakdown rather than temperature in isolation.',
            ],
            bullets: [
              'I used root cause analysis to break the broad winter-astronomy issue into interacting causes instead of accepting ï¿½cold weather is uncomfortableï¿½ as a sufficient explanation. The primary research showed that the problem was concentrated around fine telescope tasks such as focusing, tightening, eyepiece changes, and handling small components under dim red-light conditions.',
              'The RASC interview was especially important here. It showed that users often expose their fingertips because ordinary heated gloves are too bulky for the ï¿½little fiddlyï¿½ controls of telescope operation, and that dropped parts or poor tactile feedback can create extra frustration, delay, and rework. Our own field observation and glove-use videos supported the same claim: the problem was not just that astronomers were cold, but that winter conditions repeatedly broke the hand-interface relationship that telescope work depends on.',
              'This CTMF directly shaped divergence. Once the root causes were clearer, the team could justify two distinct intervention pathways: reduce the dexterity requirement itself through knob-turning aids, autonomous control, or other telescope-side changes; or increase and preserve user dexterity through hand heating, thermal zoning, or related human-centered support. That widened the design space in a disciplined way and kept the project from collapsing too early into one favorite concept.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-fig3-framing.png",
                alt: "Praxis II framing diagram contrasting redesigning the telescope with preserving user dexterity.",
                caption:
                  "This framing diagram is the clearest visual proof of what root cause analysis changed. The project did not jump directly to a glove; it first separated two legitimate intervention pathways before later convergence narrowed the field.",
              },
              {
                src: "/context-evidence/raw/praxis2-high-low-modes.png",
                alt: "Praxis II prototype figure showing high- and low-dexterity glove modes.",
                caption:
                  "Later prototyping still reflects the root-cause framing. Once preserving user dexterity became the stronger path, the design moved toward controlled shifts between warmth and fingertip access instead of treating heating alone as sufficient.",
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'Root cause analysis clarified what kind of failure the project needed to address, but it did not by itself prove which pathway would be best. It could show that cold exposure, glove bulk, fine controls, repeated rework, and equipment diversity interacted. It could not determine on its own whether the best response was telescope-side redesign, hand-centered thermal support, or environmental intervention.',
              'It also initially grouped several effects together under ï¿½dexterity lossï¿½ before later testing separated them more carefully. Early on, that meant the team still risked compressing numbness, reduced tactile feedback, increased completion time, and increased error into one broad category.',
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
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for understanding the underlying issue before optimizing a solution.',
              'It also guarded against one of my recurring biases: narrowing too quickly around the first technically coherent direction. In Praxis II, root cause analysis helped resist premature fixation by showing that the project was not automatically a glove problem. It was a winter human-equipment interaction problem with at least two credible intervention pathways.',
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
    stage: 'Diverge',
    stageCode: 'D',
    subtext: 'Used parameterized calculations and code-driven simulation to generate successive bridge states by responding to the current governing weakness.',
    overview: 'Calculations and simulation can act as a diverging CTMF when they are used to explore a design space, vary key parameters, and generate new design states rather than merely checking a finished artifact.',
    whyItMatters: 'In CIV102, it mattered because the bridge did not improve through intuition alone; it improved through a visible sequence of generated revisions.',
    evidence: [
      'CIV102: MATLAB and Python scripts generated moving-load envelopes, sectional properties, fitting logic, and failure-mode comparisons across successive bridge iterations.',
      'Praxis I: the same mindset later appeared in using measured criteria and proxy testing to compare can-opening concepts more rigorously.',
    ],
    application: 'I use calculations and simulation when a project has many tunable variables and the team needs a disciplined way to generate and compare design states before settling on one of them.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'D',
        claimHeadline: 'Calculations And Simulation Should Generate The Next Bridge State By Exposing The Next Governing Weakness.',
        summary:
          'In CIV102, calculations and simulation mattered because they generated the actual sequence of bridge iterations. Their main value was not just predicting numbers, but turning each governing weakness into a legible next revision. The final build later showed the boundary of that power: the model generated stronger bridge states more completely than it represented fabrication reality.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In CIV102, calculations and simulation mattered because they generated the sequence of bridge iterations by exposing the next governing weakness, but the final build showed that the model represented global structural behavior more completely than fabrication reality.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p7-img1.png',
                alt: 'CIV102 shear-force and bending-moment envelopes generated for one of the bridge load cases.',
                caption:
                  'These load envelopes show calculations acting as a generative CTMF. They turned moving train loads into a demand picture that later bridge states had to answer, which is why simulation in CIV102 was producing design logic rather than just checking a finished bridge.',
              },
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Calculations and simulation acted as a diverging CTMF because they were used to vary bridge parameters and generate multiple design states before fabrication.',
              'In CIV102, they were not just used to check a final bridge. They were used to explore height, top-flange layering, diaphragm spacing, web spacing, fitting feasibility, and material usage in order to decide what the next bridge iteration should be.',
              'That is the distinctive role of this CTMF in the project: it generated the evolution of the bridge rather than merely evaluating the state the team already had.',
            ],
          },
          {
            title: 'What I Used The CTMF For In CIV102 / How It Actually Influenced The Project',
            bullets: [
              'I used calculations and simulation to turn each bridge iteration into a response to a visible governing weakness rather than a guess about what geometry might be stronger. The scripts generated the moving-load shear and bending envelopes, updated sectional properties, and factors of safety for all major failure modes, which directly shaped the progression from Design 0 through later bridge states.',
              'This was collaborative technical work, but it fits my own design tendency strongly because it made the bridge evolve through explicit structural logic instead of intuition alone. More importantly, it gave the team a disciplined way to ask not just "is this bridge safe?" but "what should the next bridge look like?"',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p5-img1.png',
                alt: 'CIV102 Design 0 factor-of-safety output showing thin-plate buckling as the earliest governing weakness.',
                caption:
                  'Design 0 made the first next step legible. Thin-plate buckling governed early, so the bridge could not stay in its original state and the next iteration became a response to evidence instead of a guess.',
              },
            ],
          },
          {
            title: 'Iteration Path',
            bullets: [
              'Design 0 was governed by thin-plate buckling and predicted to fail around 260 N.',
              'Design 1 added a second top flange layer and increased predicted capacity to 668 N.',
              'Design 2 used parameter sweeps over height and flange layering, identifying three top-flange layers at 180 mm as the strongest material-feasible cross-section.',
              'Design 3 reduced diaphragm spacing and raised the predicted load to about 2.12 kN.',
              'Later iterations then reduced strength in order to regain manufacturability, eventually settling near 1.367 kN predicted capacity.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p20-img1.png',
                alt: 'CIV102 optimization output summarizing a stronger analytical bridge state.',
                caption:
                  'Later outputs show simulation acting as a search process rather than a single check. The bridge kept changing as the code identified stronger parameter combinations and new limiting conditions.',
              },
              {
                src: '/context-evidence/raw/civ102-p20-img2.png',
                alt: 'CIV102 comparison output for an alternative bridge state with lower but still viable factors of safety.',
                caption:
                  'This later comparison is important because it shows that simulation was not only maximizing strength. It was generating and comparing bridge states inside a bounded design space, which made the later tradeoff toward manufacturability visible.',
              },
            ],
          },
          {
            title: 'Where It Changed The Project',
            bullets: [
              'The calculations changed the bridge by making the next design move legible after each iteration. Instead of changing geometry arbitrarily, the team could point to the current governing weakness and respond to it.',
              'The Python fitting code also made manufacturability part of divergence: it checked whether bridge components could actually fit on one sheet of matboard, tested splice options, and produced the final cutout layout used during assembly.',
              'The assembly document shows the team numbering pieces according to the Python-generated matboard layout, which is strong evidence that the code shaped fabrication directly and not just analytical exploration.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p18-img1.png',
                alt: 'Python-generated CIV102 matboard layout showing how all bridge components were packed onto one sheet.',
                caption:
                  'The Python-generated matboard layout shows calculations changing fabrication directly, not just analysis. The code decided whether a bridge state could actually be cut and assembled from one sheet.',
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The limitation was not that the calculations were useless, but that the represented design space was incomplete. The model was strong enough to improve the global bridge by refining cross-section, diaphragm spacing, and material distribution, but it did not force local fabrication vulnerabilities like splice reliability, glue variability, cutting tolerance, and assembly eccentricity to the foreground with the same seriousness.',
              'The clearest evidence is the mismatch between the final predicted capacity, about 1.367 kN, and the built bridge failing around 580 N at the front splice. This showed that the simulation represented global section behavior more completely than the real assembly behavior that actually governed failure.',
              'That limitation matters here as a boundary on generation. The model was very good at producing stronger bridge states, but not equally good at representing every condition that could govern the built artifact later.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p14-img1.png',
                alt: 'CIV102 fitting-code output showing that a strong analytical bridge state could not fit on one sheet of matboard.',
                caption:
                  'This fitting failure shows that the represented search space was already narrower than the mathematically strongest bridge states. The model had to be reinterpreted through manufacturability constraints before a real bridge could be built.',
              },
              {
                src: '/context-evidence/raw/civ102-splice-failure.jpg',
                alt: 'CIV102 bridge highlighting the front splice failure after physical testing.',
                caption:
                  'This is the strongest rebuttal to overtrusting the generated bridge states. The final bridge failed first at a splice-sensitive condition that the global structural simulation did not foreground with the same seriousness as section-level behavior.',
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for quantitative clarity, explicit reasoning, and analyzable systems, which is why it felt natural and productive in CIV102.',
              'It also exposed the risk in that preference: I challenge what is visible in the model more naturally than what the model has idealized away.',
              'The deeper lesson for me was that a strong model can generate strong iterations while still omitting the condition that will actually fail first. In this project, calculations and simulation improved the bridge design substantially, but they did not by themselves ensure that the represented bridge and the built bridge were governed by the same weakness.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Before using simulation results to justify convergence, explicitly separate what the model covers from what it does not.',
              'Pair every strong analytical result with a short list of unmodeled local vulnerabilities, especially splices, adhesive behavior, alignment, and cutting tolerance.',
              'Treat calculations and simulation as generators of design states and strong evidence for global behavior, but not as proof that fabrication truth has been fully represented.',
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
    subtext: 'Used a morphological chart to generate distinct mechanism families for quieter can opening, then learned that divergence breadth is only as good as the frame beneath it.',
    overview: 'Morphological charts break a design problem into sub-functions and candidate means so teams can generate distinct mechanism families systematically instead of ideating in vague whole-product terms.',
    whyItMatters: 'In Praxis I, it mattered because it generated the actual concept families that later entered convergence, while later testing showed that the chart had widened implementation diversity more than explanatory diversity.',
    evidence: [],
    application: 'I use morphological charts when a problem can be decomposed into sub-functions, but I now treat them as revisable divergence tools that should be rebuilt when later evidence changes the frame.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'D',
        claimHeadline: 'Morph Charts Should Generate Distinct Mechanism Families, Then Be Rebuilt When Evidence Changes The Frame.',
        summary:
          'In Praxis I, the morphological chart mattered because it generated the exact mechanism families that later moved into convergence, testing, and elimination. Its value became visible in the real project path, but its limit became visible once later evidence showed that several of those families were diverse in implementation while still sharing the same weakening causal story about the sound event.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              "In Praxis I, the morphological chart mattered because it generated the exact concept families the team later compared, eliminated, and tested; its value became visible in the project's actual convergence path, and its limit became visible once later testing weakened the original causal frame.",
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'A morphological chart is a diverging CTMF that breaks a design problem into functions or sub-functions, then generates multiple candidate means under each so concept combinations can be explored systematically rather than through vague whole-object brainstorming.',
              'In Praxis I, it was needed because the project risk was premature fixation on one intuitive "quiet opener" idea before the team had compared materially different mechanism directions.',
              'In practice, the chart decomposed the opening event into functions such as opening the can, depressurizing the can, gripping or handling, and silencing or muffling the event, which gave the team a structured basis for divergence before formal convergence began.',
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis I / How It Influenced The Project',
            calloutTitle: 'The concept families it generated',
            callouts: [
              'needle-straw vent',
              'water opener',
              'rubber tab',
              'slider',
            ],
            figures: [
              {
                src: '/context-evidence/raw/praxis1-alpha-brainstorming.png',
                alt: 'Praxis I Alpha release brainstorming page listing early mechanism directions for quieter can opening.',
                caption:
                  'This early Alpha release page shows the shift from vague "quiet opener" thinking toward a set of materially different mechanism directions. The morph chart made that divergence structured and traceable.',
              },
              {
                src: '/context-evidence/raw/praxis1-alpha-needle-straw.png',
                alt: 'Praxis I early puncture-vent concept from the Alpha release.',
                caption:
                  'The puncture-vent branch is useful because it shows one of the chart-generated families that later entered convergence and was then removed rather than kept alive by attachment to the initial idea.',
              },
              {
                src: '/context-evidence/raw/praxis1-alpha-water-opener.png',
                alt: 'Praxis I early enclosure or water-opener style concept from the Alpha release.',
                caption:
                  'This branch represents external damping or muffling rather than mechanism replacement. It matters because later comparison showed that this family looked broader in divergence than it remained in real convergence.',
              },
              {
                src: '/context-evidence/raw/praxis1-alpha-rubber-tab.png',
                alt: 'Praxis I early rubber-tab or interface-modification concept from the Alpha release.',
                caption:
                  'The rubber-tab family survived much longer because it improved the opening interaction without fully replacing the standard can event, which made it an important intermediate comparator against the slider.',
              },
            ],
            bullets: [
              'I used the morph chart to make divergence structured, visible, and traceable so that later convergence would compare mechanism families rather than defend favorite sketches. The chart did not remain a brainstorming artifact. It produced the actual families the team carried forward: needle-straw vent, water opener, rubber tab, and slider.',
              'That mattered because the chart changed the level at which the project diverged. Instead of comparing cosmetic variants of one opener, the team had to compare fundamentally different intervention strategies: puncture venting, external damping, interface modification, and mechanism replacement. In other words, the chart gave Praxis I real implementation breadth.',
              'Those chart-generated families then became the real convergence path. The team explicitly removed needle-straw, then removed water opener, and the final comparison became slider versus rubber tab. Later testing made the downstream consequence visible: the water opener achieved about a 13 dB reduction but performed poorly on portability and on user-facing measures like liquid loss, carbonation boil-off, gesture burden, and hand pressure. The rubber tab achieved about a 25 dB reduction but still preserved the standard tear-line event. The slider achieved about a 41 dB reduction while also keeping liquid loss to about 0.46%, carbonation boil-off to about 0.4 g, hand pressure to about 80 kPa, and gesture count to 2. The morph chart therefore shaped convergence indirectly by deciding which classes of mechanism had to be screened, measured, and eliminated later.',
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            figures: [
              {
                src: '/context-evidence/raw/praxis1-p3-img1.png',
                alt: 'Praxis I reflection sheet about divergence and anchoring during the project.',
                caption:
                  'This reflection captures the real limit of the chart: it widened the concept space, but many branches still inherited the same underlying explanation of the sound event.',
              },
            ],
            bullets: [
              'The main limitation was not lack of breadth. The limitation was that the first chart still carried a hidden causal assumption about the source of the sound event.',
              'Several branches were built around the idea that the sound could be solved mainly by depressurizing the can, damping the release, or muffling the opening event. Because of that, concepts like the needle-straw, water opener, and rubber tab looked diverse as objects, but still operated inside the same broader logic: they modified or managed the standard tear-line event rather than fully replacing it.',
              'Later vented-versus-unvented testing showed essentially unchanged dB levels, which weakened that depressurization-first explanation. That is the most important limit of the CTMF in Praxis I: the chart widened the space convincingly at the level of artifacts, but not enough at the level of explanation. In hindsight, it increased implementation diversity more than explanatory diversity.',
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for explicit, structured divergence instead of vague ideation, because it made alternatives visible and gave later convergence a defensible origin.',
              'It also supported one of my strengths: resisting premature fixation on a single concept by keeping multiple mechanism families alive long enough to compare.',
              'At the same time, Praxis I showed me that structured divergence is only as good as the honesty of the function breakdown underneath it. That directly reinforced my broader position that good engineering depends not only on rigor, but on whether the framing, logic, and constraints remain honest as evidence changes. More specifically, the morph chart helped me resist fixation on one idea, but it did not fully protect me from fixation on one causal story. That is the deeper lesson I carried into my position statement.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use a morph chart early to widen the option space, but mark which functional rows are assumed rather than proven.',
              'Treat the chart as a revisable divergence artifact, not a final map of the concept space.',
              'Rebuild the chart after any major test result that changes the explanation of the problem. In Praxis I, the vented-versus-unvented result should have triggered a second-pass chart.',
              'A rebuilt chart for Praxis I would have shifted from "how do we vent or muffle the event?" toward "how do we eliminate tear-line fracture, control aperture growth, manage sealing, and preserve accessibility?"',
              'My future rule is: use morph charts to generate testable mechanism families, but never treat them as proof that the frame is already correct.',
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
    application: 'I use structured brainstorming when the team needs shared ownership of concept generation and when rapid idea quantity is more valuable than immediate polish.',
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
              'In Praxis II, biomimicry mattered because it gave the team a way to generate concept families from biological cold-survival strategies rather than from conventional winter-product assumptions, and that widened the design space before convergence narrowed it.',
              'The strongest project consequence was not that the final glove looked biomimetic. It was that biomimicry helped the team imagine selective thermal protection, local warm zones, and modal dexterity in engineering terms before later testing decided which of those ideas could survive.',
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
              'Biomimicry is a diverging CTMF that uses living systems as sources of functional analogy rather than as aesthetic inspiration. In Praxis II, it was not used to make a glove look natural. It was used to ask how biological systems survive cold efficiently, locally, and adaptively, and then convert those strategies into concept streams.',
              'That distinction matters because the project risk was converging too quickly on a familiar heated-glove model. Biomimicry challenged the assumption that winter protection had to mean bulky, uniform heating across the whole hand.',
              'Within FDCR, it belongs in Diverging because its job was to widen the option space before testing and later convergence eliminated weaker paths.',
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis II / How It Influenced The Project',
            calloutTitle: "Biological references that actually entered divergence",
            callouts: [
              'Beta Release: "Polar bear fur solution" and "hollow hairs that trap warm air."',
              'Beta Release: "Penguin huddle" and "we can create a small bubble."',
              'Beta Preparation: thermal zoning was explicitly broken into "Zone 1: Fingertips, Zone 2: Knuckle Zone, Zone 3: Wrist."',
              'Beta Preparation: the team linked this divergence directly to "our focus on sustainability," "value of appreciation of nature," and "passion for animals."',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-morph-chart.jpg",
                alt: "Praxis II morph chart showing diverging concept families for cold-weather telescope operation.",
                caption:
                  "The morph chart is one of the clearest pieces of project evidence that biomimicry widened the concept space structurally rather than just rhetorically. The biological references fed real concept branches during divergence.",
              },
              {
                src: "/context-evidence/raw/praxis2-lotus-chart.jpg",
                alt: "Praxis II lotus chart showing branching ideation around the cold-weather dexterity problem.",
                caption:
                  "The lotus chart matters here because it shows the project moving across several intervention scales at once. Biomimicry helped hold open glove, environmental, and localized-heating directions before convergence.",
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
              'I used biomimicry to widen divergence in a way that was both imaginative and structured. Instead of beginning only from existing heated gloves, the team used biological references to ask what kind of thermal logic might preserve function more intelligently. That made the diverging question less like "what product should we copy?" and more like "what survival strategy should we translate?"',
              'The strongest project evidence for this appears in the Beta ideation material. Polar bear fur was used as a reference for efficient insulation through structure and trapped air, which pushed the glove stream away from "heat the whole hand the same way" and toward more selective thermal management. Penguin huddling and igloo logic widened the environmental stream by suggesting temporary protective microclimates rather than only hand-mounted hardware.',
              'This CTMF also influenced the way the glove itself was imagined. Thermal zoning across fingertips, knuckles, and wrist is one of the clearest places where biological analogy became an engineering idea. Instead of assuming that all parts of the hand should be heated equally, the team explored whether heat should be concentrated where it most affected dexterity or blood flow. That later aligned naturally with the project’s finger-focused thermal direction.',
              'The deeper project consequence was that biomimicry kept several intervention families alive at once: direct hand heating, environmental buffering, and selective thermal zoning. That breadth mattered because it prevented the project from collapsing immediately into a single off-the-shelf heated-glove logic.',
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
              'The limitation of biomimicry in Praxis II was not that it lacked creativity. The limitation was that it could generate promising analogies without proving that those analogies were feasible, buildable, or preferable once the design became electrical, wearable, and task-specific.',
              'For example, polar bear fur could suggest selective insulation and trapped warmth, but it could not determine wire routing, voltage limits, attachment methods, or which heating pattern would actually preserve dexterity during telescope tasks. Penguin-huddle or igloo logic could justify thinking about local thermal environments, but they could not prove that an enclosure-based solution would be portable, astronomy-compatible, or acceptable in field use.',
              'In other words, biomimicry widened the space more effectively than it narrowed it. It was strongest when it generated concept families and weakest when it tried to carry the argument too late into convergence.',
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF matters to my position because it shows a different side of my design process than the more analytical Praxis II tools. Root cause analysis and verification explain how I refine a problem and challenge evidence. Biomimicry shows how I keep the early design space alive long enough for better concepts to appear.',
              'It also connected directly to my values. In Praxis II, nature appreciation, sustainability, and care for animals were not decorative beliefs attached after the design work. They actively shaped divergence by giving the team a source of functional reasoning outside default product assumptions.',
              'For me personally, biomimicry helps counter one of my recurring tendencies: moving too quickly toward tightly specified, highly rational solution logic. It keeps me in multiplicity longer. At the same time, Praxis II also showed me that I only trust biomimicry once it has been translated into engineering terms and then tested.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Going forward, I would use biomimicry more deliberately as a staged translation process: identify the biological strategy, extract the functional principle, convert that principle into a design hypothesis, and then state how the hypothesis will later be tested.',
              'In Praxis II, that would mean writing the chain explicitly: polar bear fur -> trapped air and efficient insulation -> selective glove insulation or thermal zoning -> test localized temperature retention and dexterity; penguin huddle / igloo -> buffered local microclimate -> protected warm zone or enclosure -> test portability, setup burden, and task compatibility.',
              'My practical rule is that biomimicry should generate the logic of a concept, not stand in for proof that the concept works. If the biological analogy is still carrying most of the argument late in the project, then it has not yet been translated into engineering evidence strongly enough.',
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
    application: 'I use Pugh charts once there are several credible concepts and the team needs a transparent method for narrowing choices without relying on preference alone.',
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
              'It is most useful when the team needs a structured argument for why one concept class should keep moving and another should stop.',
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
    subtext: 'Used the Pugh chart in Praxis I to make concept narrowing legible and revisable once stakeholder criteria and mechanism families were already clearer.',
    overview: 'A Pugh chart compares alternatives against a datum using explicit criteria so concept narrowing can be discussed, defended, and reopened rather than driven by intuition alone.',
    whyItMatters: 'In Praxis I, it mattered because it changed which concepts deserved more testing, but it also showed that a clean matrix can narrow the field long before it proves the frame or the final concept is correct.',
    evidence: [],
    application: 'I use Pugh charts once there are several credible concepts and the team needs a transparent way to narrow options, but I treat the matrix as a convergence tool rather than proof that the frame or final concept is already correct.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'C',
        claimHeadline: 'Pugh Charts Should Make Concept Narrowing Legible And Revisable, Not Mistake A Clean Matrix For Truth.',
        summary:
          'In Praxis I, the Pugh chart mattered because it turned the stakeholder-informed criteria and morph-generated concept families into a traceable narrowing process. Its real value was not choosing the winner by itself, but deciding which concepts deserved more testing and which ones should stop. Its real limit was that a clean matrix could still look convincing even if the frame beneath it remained unstable.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In Praxis I, the Pugh chart mattered because it turned several plausible can-opening concepts into a structured convergence process, but it also showed me that a clean comparison matrix can only narrow the field; it cannot prove that the frame or the final concept is already correct.',
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'A Pugh chart is a converging CTMF that compares concepts against a datum using explicit criteria so tradeoffs can be discussed and weaker directions can be narrowed out systematically.',
              'In Praxis I, it was needed after stakeholder analysis had widened the criteria and the morph chart had generated distinct mechanism families. At that point the team had multiple viable concepts, including the needle-straw, water opener, rubber tab, and slider, and needed a more defensible way to narrow them than intuition alone.',
              'Within FDCR, it belongs in Converging because it sits after divergence has created credible options and before later measurement can confirm, weaken, or overturn the narrowing decision.',
            ],
          },
          {
            title: 'What I Used The CTMF For In Praxis I / How It Actually Influenced The Project',
            bullets: [
              'This was collaborative convergence work rather than a solo artifact, and I used the Pugh chart to make concept narrowing traceable by tying it to explicit criteria instead of preference. In Praxis I, that meant converting earlier framing and divergence work into a disciplined narrowing step rather than jumping straight from ideation to a favorite concept.',
              "The sequence matters. Pairwise comparison prepared the claims and rebuttals for each concept, and the Pugh chart then turned those arguments into a clearer middle stage of convergence before the final measurement matrix. The chart therefore did not function as the final proof of the project; it functioned as a decision-hygiene tool for deciding which concepts were still worth the cost of further testing.",
              'Pugh Chart Version 1 helped confirm the early removal of the needle-straw concept because its safety and accessibility problems remained difficult to justify. A later Pugh comparison then kept the water opener, rubber tab, and slider alive long enough for testing rather than forcing an immediate winner. That was the key project effect: the chart decided what happened next.',
              'Later testing then made the narrowing legible in engineering terms. The slider emerged as the strongest overall direction because it performed well not just on sound reduction, but on the broader criteria the matrix had kept active, including beverage integrity, interaction quality, and portability. In plain terms, the chart removed the weakest branch, delayed premature commitment among the stronger ones, and made later testing part of convergence instead of treating the matrix as the verdict.',
            ],
            calloutTitle: 'Convergence Path',
            callouts: [
              'Pairwise comparison prepared the claims and rebuttals for each concept before the formal matrix was built.',
              'Version 1 supported removing the needle-straw concept on safety and accessibility grounds.',
              'Version 2 kept the water opener, rubber tab, and slider in play long enough for prototype testing and the later measurement matrix.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/praxis1-converging-pairwise-worksheet.jpg',
                alt: 'Praxis I pairwise comparison preparation worksheet for the actual slider concept.',
                caption:
                  'This worksheet shows that convergence started by making the claims for and against each concept explicit before the Pugh matrix formalized those tradeoffs.',
              },
              {
                src: '/context-evidence/raw/praxis1-converging-pugh-chart.jpg',
                alt: 'Praxis I hand-drawn Pugh chart comparing needle-straw, water opener, slider, and rubber-tab concepts across several criteria.',
                caption:
                  'The Pugh chart mattered because it turned several plausible concepts into a visible narrowing structure. It did not just record a decision after the fact; it helped decide which branches should survive longer.',
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The main limitation is that a Pugh chart is only as strong as the frame and criteria underneath it. In Praxis I, the chart did not prove that the slider was correct; it only narrowed the field until later measurement could validate or challenge that narrowing.',
              'That mattered because a weak explanation of the sound event could still have produced a clean-looking convergence result. Several early branches were built around managing the standard opening event through venting, damping, or muffling. The matrix could organize comparison well while still converging around the wrong logic if that causal story stayed unchallenged.',
              'This is the distinct lesson of the CTMF in Praxis I: clean comparison can create premature confidence. Later testing is what exposed that boundary. The comparison charts became trustworthy only after the project had stronger evidence about what the opening event was actually doing and why the slider was different in more than one criterion.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/praxis1-converging-acoustic-comparison.png',
                alt: 'Praxis I acoustic impulse comparison between the control pull-tab can and the slider can over time.',
                caption:
                  'This later acoustic result is the rebuttal to overtrusting the matrix. The Pugh chart narrowed the field, but measured evidence is what showed whether the surviving concept actually outperformed the standard opening event in practice.',
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for explicit criteria, visible tradeoffs, and structured justification during convergence.',
              'It also exposed the risk in that preference more sharply than the other Praxis I tools: I can be persuaded too quickly by an organized matrix if I forget that comparison quality depends on frame quality.',
              'The deeper lesson for me was that good convergence is not just about comparing concepts well; it is about judging whether the criteria and problem framing are trustworthy enough for comparison to mean anything. That is why this CTMF supports my position statement differently from the morph chart: it is not mainly about generating alternatives, but about resisting false confidence once narrowing starts to feel clean.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use a Pugh chart only after the framed opportunity and criteria are clear enough that disagreement about the matrix is not really hidden disagreement about the problem.',
              'Pair the chart with an explicit rebuttal check: what later result would make the team reopen the matrix instead of defending it.',
              'Treat the Pugh chart as a tool for narrowing concepts, not as proof that the argument is closed.',
              'My practical rule going forward is to let the matrix generate a stronger next step, but never to let it substitute for later testing or reframing when the evidence starts to move.',
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
    subtext: 'Used Pugh-like convergence logic in CIV102 through factor-of-safety comparison tables that decided which generated bridge state should survive.',
    overview: 'In CIV102, the role of a Pugh chart was carried by FOS comparison tables that made bridge iterations comparable, traceable, and convergent without pretending the strongest analytical number was automatically the best design.',
    whyItMatters: 'It mattered because the bridge only improved when generated states were narrowed against explicit failure criteria, buildability, and manufacturability rather than left as equally plausible analytical options.',
    evidence: [
      'CIV102: Design 0, Design 1, later diaphragm revisions, and the final bridge were all compared through the way their controlling failure mode shifted after each design move.',
      'CIV102: the final built bridge failed at 580 N rather than the predicted 1367 N, which revealed that convergence tables had been stronger for global section behavior than for local splice vulnerability.',
    ],
    application: 'I use this style of converging CTMF when iterations need to be compared systematically against the current limiting condition rather than by vague impressions of what looks stronger.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'C',
        claimHeadline: 'FOS Comparison Tables Should Narrow Generated Bridge States Without Pretending Convergence Has Closed The Problem.',
        summary:
          'In CIV102, the FOS comparison tables acted as a Pugh-like converging CTMF because they made each iteration answer the current governing weakness and then decided which generated bridge state should be kept, modified, or abandoned. Their limit was not poor organization, but false completeness: they converged the analytical bridge more fully than the built bridge.',
        sections: [
          {
            title: 'Core Claim',
            bullets: [
              'In CIV102, the FOS comparison tables acted as a Pugh-like converging CTMF because they made each iteration answer the current governing weakness, but the final bridge showed that they converged the analytical bridge more completely than the built bridge.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p19-img1.png',
                alt: 'CIV102 final cross-section and diaphragm-location diagram for the converged bridge state.',
                caption:
                  'This final geometry is the product of the convergence structure. It shows that the Pugh-like tables were not choosing between abstract ideas, but selecting a specific bridge state with committed section dimensions and diaphragm locations.',
              },
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'In this project, the role of a Pugh chart was carried by FOS comparison tables that compared bridge iterations against visible failure criteria rather than against vague impressions of what looked stronger.',
              'They belong in Converging because they were used to decide whether the next bridge state should be kept, modified, or abandoned.',
              'In CIV102, they mattered because the team was not choosing between unrelated concepts; it was converging through a sequence of structural revisions, and each revision needed a traceable reason to survive or stop.',
            ],
          },
          {
            title: 'What I Used The CTMF For In CIV102 / How It Actually Influenced The Project',
            bullets: [
              'I used this CTMF to read each design as an answer to the current limiting condition rather than as a vague attempt to make the bridge stronger everywhere. That made convergence a matter of disciplined comparison, not intuition or attachment to one strong-looking iteration.',
              'Design 0 showed thin-plate buckling case 1 controlling at a factor of safety of about 0.597, with failure around 260 N, so the original section clearly could not stay. Design 1 doubled the top flange, shifted the controlling mode toward compression, and raised the predicted load to 668 N. Design 2 optimized height and top-flange layering, which improved compression and shear but exposed web shear buckling as the new governing condition. Design 3 reduced diaphragm spacing from 400 mm to 100 mm, raising the predicted load to 2.12 kN, but this design was not manufacturable.',
              'That is where the convergence role becomes clearest. Design 4 introduced fitting logic and splice feasibility, so the question changed from "what is strongest?" to "what is strongest that can actually be built from one matboard sheet?" Design 4.1 then removed the bottom flange because it was overdesigned: about 12% load loss for about 25% material saved, which was a justified tradeoff rather than wasted strength. This CTMF therefore influenced the project by making every major revision legible and comparable rather than simply generated.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p13-img1.png',
                alt: 'CIV102 bridge elevation showing a diaphragm-spacing state with 400 mm intervals.',
                caption:
                  'This diaphragm-spacing figure helps show what convergence was actually comparing. Spacing was not treated as a background detail; it became a variable the team could revise when deciding which bridge state should survive.',
              },
              {
                src: '/context-evidence/raw/civ102-p15-img1.png',
                alt: 'CIV102 terminal output showing that a splice position could not satisfy sheet constraints.',
                caption:
                  'This splice-feasibility rejection captures the moment when convergence had to change its question. A stronger analytical bridge state was not enough if no splice position could make it buildable on one sheet.',
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The limitation was not that the tables were wrong, but that they were more complete for global section behavior than for local fabrication reliability.',
              'They were excellent at exposing buckling, compression, shear, and overdesign, but they did not force splice reliability, adhesive variability, and fabrication tolerance to the foreground with the same clarity.',
              'The clearest rebuttal is that the final analytical bridge was predicted around 1.367 kN, but the built bridge failed around 580 N at the front splice. That means the convergence tables were strong enough to optimize the modeled bridge, but not complete enough to close the argument about the built one.',
              'That is the distinct lesson of this CTMF in CIV102: clean convergence can still create false confidence if the criteria are more complete for the represented bridge than for the fabricated bridge.',
            ],
            figures: [
              {
                src: '/context-evidence/raw/civ102-p3-img1.png',
                alt: 'CIV102 matboard layout for a buildable bridge revision.',
                caption:
                  'This final layout shows what the convergence structure did capture well: it produced a bridge that could actually be cut and assembled. But buildable layout success still did not guarantee that the modeled bridge and the real bridge would fail for the same reason.',
              },
              {
                src: '/context-evidence/raw/civ102-failure.png',
                alt: 'CIV102 bridge collapsing during destructive testing.',
                caption:
                  'This full collapse image is the strongest rebuttal on the page. The built bridge revealed a governing fabrication-sensitive condition that the convergence tables had not represented with the same clarity as global section behavior.',
              },
            ],
          },
          {
            title: 'Impact On My Position In Context',
            bullets: [
              'This CTMF fits my preference for explicit, analyzable comparison and for decisions that can be justified through visible criteria instead of vague structural intuition.',
              'CIV102 also exposed the downside of that preference: when the convergence structure is clean, I can overtrust what is in the table and underweight what the table does not represent.',
              'The deeper lesson for me was that good convergence is not just about choosing the strongest numerical iteration; it is about knowing whether the criteria are still capturing the condition that will actually govern the built artifact. That is what makes this CTMF different from calculations and simulation: its main risk is not generation failure, but false confidence in narrowing.',
            ],
          },
          {
            title: 'Future Steps',
            bullets: [
              'Use this CTMF to decide the next iteration, not to declare the structure solved.',
              'Add an explicit local-reliability row whenever the design depends on splices, adhesive interfaces, or placement tolerances.',
              'Treat destructive testing as a chance to reopen the convergence logic, not just to judge whether the final bridge passed or failed.',
              "My practical rule is: if the bridge's success depends on a fabrication detail, that detail must appear in the convergence structure before I trust the numerical result too much.",
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
    stage: 'Represent / Converge',
    stageCode: 'R/C',
    subtext: 'Used testing to challenge the procedure, separate blended claims, and change which concept path remained strongest.',
    overview: 'Verification and validation combine technical checking with fit-to-context evaluation, but in Praxis II their deeper value was that they exposed when the testing procedure itself was too weak to support the design claims being made.',
    whyItMatters: 'This CTMF keeps clean-looking numbers from being mistaken for trustworthy evidence when the test is still representing the phenomenon poorly.',
    evidence: [
      'Praxis II: splitting dexterity and temperature testing changed what counted as evidence, weakened the knob-turner path, and made the glove path more defensible.',
      'CIV102: physical bridge testing exposed where the analytical model stopped accounting for real splice vulnerability.',
    ],
    application: 'I use verification and validation whenever a project needs evidence that can challenge assumptions, test whether the procedure deserves trust, and narrow concepts responsibly.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'R/C',
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
                  "This figure supports the core claim because dexterity had to become a distinct measured variable. The project improved once the team stopped assuming that any change in hand warmth automatically described usable telescope manipulation.",
              },
            ],
          },
          {
            title: 'CTMF Description / What It Is',
            bullets: [
              'Verification in Praxis II meant checking whether a concept or subsystem actually achieved measurable task or thermal performance. Validation meant checking whether that performance corresponded to the real use pattern of winter telescope operation.',
              'This CTMF belonged in both Representing and Converging because the tests were not only checking prototypes. They were also deciding whether the team was even using the right success criteria and whether one procedure could honestly support two different claims.',
              'The project became stronger only once warmth and usable dexterity were no longer treated as one blended outcome. That distinction is the main reason this CTMF mattered here.',
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
              'Because that procedure was weak, the team had to split thermal retention from dexterity performance instead of claiming that one test captured both.',
              'That split changed convergence: the knob-turner weakened as a narrow manipulation solution, while the glove path strengthened because it could now be judged on both warmth and task performance more honestly.',
            ],
            bullets: [
              'I used this CTMF to decide whether the project’s testing logic deserved trust before letting the results shape convergence. The first cold-plunge procedure produced numbers, but those numbers were not yet good evidence because the cold condition only lasted briefly and therefore did not represent the sustained exposure that actually matters in outdoor astronomy. The issue was not just that the concepts were immature; the procedure itself was misrepresenting the problem.',
              'That procedural failure changed the design method. Instead of continuing to let one test stand in for both thermal and dexterity claims, the team separated those questions. Dexterity performance was assessed through task-based measures, while temperature retention was checked separately. This created a more honest basis for comparison because it stopped blending two different phenomena into one result.',
              'That change then affected convergence. Once testing was split, the knob-turner became less compelling because its value depended more heavily on one narrow manipulation task, while the glove concept became more defensible because it could be evaluated against the full winter-use tradeoff between warmth, task performance, and usability. The project therefore did not simply move toward “more heat.” It moved toward a multi-mode glove logic in which warmth could be maintained by default while dexterity could be recovered when needed.',
              'Validation also expanded beyond the immediate telescope context in a bounded way. Secondary examples such as delivery riders using handlebar muffs reinforced the broader design principle that high protection and high dexterity do not have to exist in the same state at the same time. That did not validate telescope use directly, but it did strengthen the modal tradeoff logic behind the final design.',
            ],
            figures: [
              {
                src: "/context-evidence/raw/praxis2-testing-heating-wires.webp",
                alt: "Praxis II prototype testing of the glove heating wires during development.",
                caption:
                  "Verification happened at the subsystem level as well. The team was not only judging ideas in the abstract; it was checking whether wire placement, heat delivery, and construction details could support the larger claim being made about the glove.",
              },
              {
                src: "/context-evidence/raw/praxis2-internal-schematic.png",
                alt: "Praxis II internal schematic of the final GRIPPy glove architecture.",
                caption:
                  "The internal architecture changed because the evidence changed. The design moved toward a controlled multi-mode glove, not just a hotter glove, because the revised procedure supported warmth-by-default and dexterity-on-demand as the more honest response to the use pattern.",
              },
              {
                src: "/context-evidence/raw/praxis2-analog-validation.svg",
                alt: "Custom comparison showing the shared cold-exposure tradeoff pattern between astronomy users and delivery riders.",
                caption:
                  "This is analog validation, not telescope-specific proof. It reinforces the broader modal tradeoff pattern, but it cannot replace astronomy-specific validation of telescope tasks.",
              },
            ],
          },
          {
            title: 'Limitations Of The CTMF',
            bullets: [
              'The main limitation was not that testing failed to produce data. It was that early in the project the procedure was too weak to justify the claims being made from that data. Praxis II had numbers early, but those numbers were not yet good evidence because the cold-plunge setup did not represent the real cold-exposure problem well enough.',
              'Analog validation from delivery riders was also bounded. It could support the idea that protection and dexterity can be separated by mode, but it could not prove that the glove was optimal for telescope manipulation or replace astronomy-specific validation of focusing, swapping, and other telescope tasks.',
              'More generally, this CTMF could refine the design argument only as far as the procedures and contexts being tested were trustworthy. A clean test structure can still converge around the wrong implication if the procedure is representing the phenomenon poorly.',
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
              'This CTMF fits my preference for explicit measurement and visible reasoning, but Praxis II showed me that I can overtrust measurement when the procedure looks organized even if it is still representing the phenomenon poorly.',
              'The project therefore deepened my understanding of rigor. My real design task is not just to gather data, but to judge whether the procedure deserves trust before letting the results shape convergence.',
              'That is why this CTMF is important to my position in context: it turned testing from a confirmation activity into a direct challenge to my own tendency toward premature precision.',
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
              'State in advance what result would force the team to reopen the test logic. In Praxis II, the short-lived cold effect should have triggered that rule immediately.',
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




import { Ctmf } from "../types";

export const PROJECTS: Ctmf[] = [
  {
    slug: "challenge-assumptions",
    title: 'Challenge Assumptions',
    stage: 'Frame',
    stageCode: 'F',
    subtext: 'Tested whether default choices, inherited assumptions, and apparently obvious directions were actually justified before the design logic hardened.',
    overview: 'Challenge assumptions is a framing CTMF that asks which starting beliefs are helping the project, which are conservative shortcuts, and which are quietly shaping the design in misleading ways.',
    whyItMatters: 'It prevents a project from becoming highly optimized around a weak premise simply because the initial logic looked reasonable.',
    evidence: [
      'CIV102: questioned whether more complex bridge forms were actually better than a simple, analyzable pi-beam and later exposed that splice reliability had been underframed as a structural issue.',
      'Praxis I: the same mindset became critical once evidence showed that can-opening noise was not mainly being driven by depressurization.',
    ],
    application: 'I use this CTMF early to test whether the project is leaning on inherited defaults, and again after testing when the real artifact behaves differently from the model.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'F',
        claimHeadline: 'Challenge Assumptions Should Reopen Structural Framing When the Clean Model Stops Matching the Real Bridge.',
        summary:
          'In Toulmin terms, the ground here is the mismatch between what the bridge calculations rewarded and what the built bridge actually punished. The lesson is not that assumptions are bad; it is that they must be reopened when fabrication reality changes the governing condition.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'Design 0 failed at about 260 N with thin-plate buckling case 1 controlling at 0.597, which showed the baseline example was not close to the required performance.',
              'The team deliberately chose the simple box-girder / pi-beam path over truss or trapezoidal forms because it was more analyzable and constructible, not because it looked more impressive.',
              'The final analytical bridge was predicted to fail at 1367 N in compression, but the built bridge failed at 580 N at the front splice, which is the clearest evidence that at least one important assumption about what governed the bridge was incomplete.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'Challenge Assumptions is a framing CTMF used to test whether a default choice, inherited example, or convenient simplification is still justified once evidence accumulates.',
              'Within FDCR, it belongs in Framing because it acts on what the team believes the problem is and what kind of solution space should be trusted before divergence and convergence become too expensive.',
              'In practice, it is a guard against optimizing the wrong bridge logic too confidently.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'This CTMF appeared first in the early decision to prefer the simple pi-beam form, which was a deliberate rejection of the assumption that a more complex bridge would necessarily be the better engineering choice.',
              'It appeared again when the FOS tables showed that the bottom flange was overdesigned and using material that did not control the governing failure mode, which justified removing it.',
              'In hindsight, I should also describe the final splice failure through this CTMF because it shows that the project did not challenge its splice assumptions hard enough before committing to the final build.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was the early assumption challenge around bridge form and wasted material, because those checks kept the bridge analyzable and materially efficient.',
              'What failed was that the CTMF was applied more strongly to global section geometry than to local splice vulnerability. The bridge therefore converged on a clean analytical story while still carrying a fragile manufacturing condition.',
              'This is the project where the rebuttal matters: strong calculations did not rebut the possibility of a weaker local mechanism; the test did.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF fits my preference for controllable, explicit, and defensible engineering because it asks whether the frame itself is coherent before optimization proceeds.',
              'At the same time, it acts as a guard against my bias toward clean analytical logic, because that same bias can make me trust an elegant model longer than I should.',
              'CIV102 is strong evidence that one of my strengths, comfort with analyzable systems, can also become a weakness if it delays questioning local fabrication uncertainty.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would use this CTMF at two explicit moments: once before committing to a structural family, and again after the first manufacturable layout is fixed, specifically to ask what local features the model is still idealizing.',
              'For bridge work, that means challenging splice assumptions, adhesive assumptions, and alignment assumptions with the same seriousness used for bending and buckling assumptions.',
              'A practical rule I would keep is this: whenever the final recommendation depends on a local fabrication detail, that detail should be treated as part of Framing and not left until testing reveals it too late.',
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
    subtext: 'Identified and prioritized stakeholders to understand competing needs and constraints, enabling a user-centered design frame.',
    overview: 'Stakeholder mapping helps define who is affected by a design decision, who influences the process, and where conflicting priorities are likely to surface before solutions harden too early.',
    whyItMatters: 'This CTMF keeps the work grounded in people and systems instead of letting the design brief collapse into only technical requirements.',
    evidence: [
      'Praxis I: clarified how quiet-study users, users with reduced dexterity, and manufacturing constraints all shaped what a quieter can-opening system could realistically become.',
      'Praxis II: clarified who experiences friction most directly inside the intervention system and who constrains implementation.',
      'Portfolio work: used stakeholder awareness to decide how the site should communicate process to viewers rather than only outcomes.',
    ],
    application: 'I use stakeholder mapping early to identify decision-makers, affected users, and overlooked groups, then revisit it when the project scope changes.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'F/R',
        claimHeadline: 'Stakeholder Analysis Should Translate NGOs Into Measurable Requirements Before Divergence Begins.',
        summary:
          'The inductive move in Praxis I was from stakeholder pressure to requirements, not from a favorite concept to a post-hoc justification. The warrant is that a quieter can-opening system only counts as engineering progress if it stays usable, safe, and practical for the people and systems around it.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'The report identifies students and educators, users with functional limitations, regulators, and manufacturers or beverage companies as the main stakeholder groups shaping the problem.',
              'Those groups directly produced the project NGOs and requirement sets: <=70 dB, <=25 N, <=200 kPa, <=3 gestures, strict size and mass limits, and food-safety / edge-safety constraints.',
              'This is the strongest evidence that the project was not framed only as “make the can quieter,” but as “make the can quieter without breaking accessibility, safety, beverage integrity, or practicality.”',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'Stakeholder analysis is a framing and representing CTMF that identifies who is affected, who constrains implementation, and how those pressures should become engineering requirements.',
              'In FDCR, it belongs in Framing because it helps define the opportunity, and in Representing because it is what turns NGOs into explicit requirements, evaluation criteria, and tests.',
              'It is most useful when the temptation is to collapse a project into one attractive metric and ignore the rest of the use context.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'This was collaborative team framing work rather than a solo artifact, and I should not present it as if I authored the whole structure alone.',
              'My use of it was to support a problem definition that stayed broader than noise reduction alone and to justify why concepts had to be judged against accessibility, cleanliness, and portability as well.',
              'In practice, this CTMF shaped the evaluation logic that later made the slider recommendation more defensible because the concept had to satisfy more than just the acoustic target.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was that stakeholder analysis prevented the project from becoming a one-number dB optimization and gave the later concept comparisons a defensible basis.',
              'What failed was that strong stakeholder framing still did not reveal the physical mechanism behind the sound event. It told us what mattered, but not yet what was actually causing the problem.',
              'That limitation matters because it shows stakeholder analysis is necessary in Framing, but not sufficient by itself for mechanism-level understanding.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF fits my preference for explicit logic and traceable criteria because it converts vague user pressure into a structure I can reason through.',
              'It also acts as a guard against my bias toward narrowing too quickly around one elegant technical objective, because it forces multiple legitimate constraints to stay visible at once.',
              'In Perry-model terms, it pushed the project away from a dualistic “quiet is the only goal” view toward a more relativist understanding that several stakeholders define success differently.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would use stakeholder analysis with a follow-up rule: every major stakeholder need should be linked to a requirement, but every requirement should also be checked against whether it assumes a mechanism too early.',
              'I would also state more clearly which stakeholder interpretations were collaborative and which requirement translations I personally pushed hardest.',
              'A practical version of this lesson is: use stakeholder analysis to frame the NGOs first, then use testing to see whether the physical explanation underneath that frame is still valid.',
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
    subtext: 'Traced an initially broad problem back to the deeper mismatch actually producing the failure pattern that mattered.',
    overview: 'Root cause analysis pushes beyond surface symptoms to identify the underlying condition a design should actually respond to before the team starts optimizing the wrong thing.',
    whyItMatters: 'It keeps a project from mistaking visible inconvenience for the true bottleneck shaping user performance.',
    evidence: [
      'Praxis II: shifted the project from generic winter discomfort to the dexterity-manipulability gap experienced during fine telescope operation in cold weather.',
      'Praxis I: the same mindset later helped distinguish a symptom-level noise problem from the deeper mechanism creating the sound event.',
    ],
    application: 'I use root cause analysis when a problem seems broad, ambiguous, or easy to misread from surface symptoms alone.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'F',
        claimHeadline: 'Root Cause Analysis Should Narrow the Intervention to the Dexterity Bottleneck Before Objectives Harden.',
        summary:
          'The ground in Praxis II was not just that observers were cold. It was that cold conditions repeatedly broke fine manipulation during astronomy tasks, and that this failure pattern supported a narrower claim about what the project should actually fix.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'The project started with a broad winter-astronomy usability problem and two competing intervention directions: preserve the user’s dexterity directly or redesign telescope interfaces so less dexterity would be required.',
              'Stakeholder engagement and observation shifted the problem away from generic cold discomfort and toward the dexterity-manipulability gap experienced during fine telescope tasks.',
              'This is the strongest available ground for the later glove concept because it identifies a repeatable task-level failure pattern rather than only a general environmental discomfort.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'Root Cause Analysis is a framing CTMF used to move past symptoms and identify the underlying mismatch a design should actually address.',
              'Within FDCR, it belongs in Framing because it acts before divergence and convergence by deciding which failure pattern deserves design attention.',
              'It is especially useful when a project sounds obvious in plain language but is still underspecified as an engineering problem.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'This CTMF shaped the project when the team scoped in from many possible winter-use directions toward preserving hand dexterity directly.',
              'My role in the reflective framing is strongest here because I have already identified that I personally drove the scope narrowing and the later objective softening after seeing how early detail had constrained the solution space.',
              'That means this CTMF was not only descriptive in the project; it is also one of the clearest places where my own approach to framing changed.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was that root-cause framing made the project more specific and therefore more actionable: preserving manipulability became a clearer target than solving winter astronomy in general.',
              'What failed was that precision in the framing later became overprecision in the objectives. The same drive to be exact created Beta goals that were too detailed and had to be softened.',
              'This is the rebuttal built into the CTMF: a stronger frame is helpful, but a prematurely rigid frame can become its own design constraint.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF fits my tendency to want explicit logic and a clean problem statement, which is why I was drawn to narrowing the project quickly once the dexterity bottleneck became visible.',
              'It also exposes the downside of that strength. In Perry-model terms, I was moving away from dualism, but my first attempt at commitment still risked becoming overly rigid before enough divergence had happened.',
              'Root Cause Analysis therefore functioned both as a strength and as a warning: I can frame precisely, but I need to preserve space for multiplicity before locking into commitment.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would separate root-cause framing from objective-setting more deliberately: first identify the likely bottleneck, then keep two or three plausible formulations alive long enough to test whether the narrowest one is really stable.',
              'A practical rule for me is that if a root-cause statement immediately excludes many concepts, I should treat it as provisional until divergence and early validation have tested it.',
              'I would also document more explicitly which observations supported the narrowing and which of my own values made that narrowing feel attractive.',
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
    subtext: 'Used parameterized calculations and code-driven simulation to explore structural options, surface tradeoffs, and generate successive bridge iterations.',
    overview: 'Calculations and simulation can act as a diverging CTMF when they are used to explore a design space, vary key parameters, and expose how changing one decision shifts the governing failure mode somewhere else.',
    whyItMatters: 'It turns structural intuition into a search process and makes iteration traceable instead of relying on one-off guesses.',
    evidence: [
      'CIV102: MATLAB and Python scripts generated moving-load envelopes, sectional properties, fitting logic, and failure-mode comparisons across successive bridge iterations.',
      'Praxis I: the same mindset later appeared in using measured criteria and proxy testing to compare can-opening concepts more rigorously.',
    ],
    application: 'I use calculations and simulation when a project has many tunable variables and the team needs a disciplined way to explore tradeoffs before settling on one design state.',
    dossiers: [
      {
        project: 'CIV102',
        phaseCode: 'D',
        claimHeadline: 'Calculations and Simulation Should Generate Bridge Iterations, But They Should Not Be Mistaken for Fabrication Truth.',
        summary:
          'The claim here is inductive: the bridge improved because the team kept using calculations to expose new governing weaknesses. The rebuttal is equally important: the final splice failure proved that a strong simulation pathway does not automatically mean the represented design space is complete.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'Design 0 failed at about 260 N, Design 1 rose to 668 N, Design 3 reached 2.12 kN analytically, and the final buildable design settled at 1.367 kN predicted capacity.',
              'Those changes came from MATLAB and Python tools that generated moving-load envelopes, sectional properties, FOS values, fitting checks, and diaphragm-placement logic.',
              'The final built bridge then failed at 580 N at the front splice, which is the strongest evidence that the model represented the global structure well but did not fully represent fabrication vulnerability.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'Calculations and simulation act as a diverging CTMF when they are used to explore a parameterized design space rather than only confirm a final answer.',
              'Within FDCR, this belongs in Diverging for CIV102 because the scripts were used to generate and compare multiple bridge states by changing height, flange layering, web spacing, diaphragm spacing, and fitting feasibility.',
              'They are representational prototypes in mathematical and simulation form: models whose purpose is to generate information about the design concept before fabrication.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'The project used calculations and simulation to move iteratively from Design 0 through later height, flange, diaphragm, and fitting decisions instead of treating each design as a disconnected guess.',
              'This was collaborative technical work, and I should distinguish between the team’s shared code base and my personal design interpretation of what those outputs meant for the bridge direction.',
              'The specific value of the CTMF for my portfolio is that it matched my instinct to work through explicit, analyzable variables rather than rely on intuition about what looked stronger.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was that the scripts made the governing mode visible after each change, which turned iteration into a reasoned search rather than a sequence of arbitrary geometry tweaks.',
              'What also worked was the addition of fitting logic, because it prevented the design from remaining purely theoretical once material constraints became binding.',
              'What failed was that the represented design space still underweighted splice placement and manufacturing tolerance, so the calculations supported a bridge that was analytically coherent but physically too sensitive.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF aligns strongly with my preference for quantitative clarity, controllable systems, and explicit reasoning, which is why it felt natural and productive in CIV102.',
              'That same fit creates a risk: because I trust well-structured calculations, I can be slow to question what the model is still omitting.',
              'In Toulmin terms, this CTMF gave me strong grounds, but the splice failure showed that my warrant for trusting those grounds had to be qualified more carefully.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would explicitly separate what the simulation covers from what it does not cover before using it to justify convergence.',
              'For bridge work, that means pairing every strong analytical result with a short list of unmodeled local vulnerabilities such as splices, adhesive placement, cutting tolerance, or assembly eccentricity.',
              'My practical rule is that once a model starts driving major design confidence, I need one representational countermeasure that tests the model’s blind spots rather than only its strengths.',
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
    subtext: 'Decomposed the design problem into sub-functions and systematically explored solution combinations across each dimension.',
    overview: 'Morphological charts break a design problem into functions and candidate means, making it easier to combine possibilities methodically instead of ideating in vague wholes.',
    whyItMatters: 'This CTMF turns divergence into a repeatable process and reveals combinations that might be missed in looser concept generation.',
    evidence: [
      'Praxis I: made it possible to compare concepts that changed the can-opening mechanism itself, including slider systems and other alternatives beyond simple tab attachments.',
      'CIV102: mirrored the same mindset by separating structural choices into manageable design variables.',
      'Portfolio work: helped think modularly about content sections, transitions, and supporting details.',
    ],
    application: 'I use morphological charts when a project can be decomposed into sub-functions and I want the team to explore combinations without losing structure.',
    dossiers: [
      {
        project: 'Praxis I',
        phaseCode: 'D',
        claimHeadline: 'Morph Charts Should Be Rebuilt When the Frame Changes, Not Treated as a One-Time Divergence Artifact.',
        summary:
          'The ground here is that the first morph chart widened the concept space, but much of that space still inherited the original depressurization assumption. The lesson is that divergence only stays useful if the frame underneath it is still valid.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'The Praxis I morph chart generated concept families including puncture-based venting, water damping, rubber-tab modification, and slider-like integrated lid ideas.',
              'That is evidence that the CTMF broadened the design space beyond one tab-attachment concept and made multiple mechanism classes visible at once.',
              'The later vented-versus-unvented result, however, showed that much of the early concept space still rested on an incomplete assumption about what caused the noise event.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'A morph chart is a diverging CTMF that decomposes a design problem into sub-functions and then generates multiple possible means for each one.',
              'In FDCR, it belongs in Diverging because it is meant to expand option space before convergence begins.',
              'It is a structured prompt for concept generation, not evidence that the current frame is already correct.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'In Praxis I, the morph chart functioned as the team’s main formal divergence tool and gave the project a visible spread of design concepts before convergence.',
              'My personal connection to it is that it countered my tendency to move quickly toward analyzable or already-legible solutions by forcing a broader set of mechanisms onto the table.',
              'At the same time, because the project frame was still partially unstable, the chart shows how even structured divergence can inherit the same wrong premise across many ideas.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was breadth: the morph chart made the design space visible, discussable, and less dependent on whoever spoke first in brainstorming.',
              'What failed was that the first chart did not sufficiently resist the original framing assumption, so many concepts still differed only inside the same underlying logic.',
              'This is the rebuttal the project gave me: a morph chart can widen divergence while still remaining trapped in a narrow frame.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF is useful for me because it counterbalances my preference for explicit logic by forcing me to tolerate a larger and less settled concept space during Diverging.',
              'It also shows the downside of my instincts: if I enter the morph chart with a hidden framing assumption, I can still generate many ideas that all inherit the same weakness.',
              'In Perry-model terms, it is one of the tools that helps me stay in multiplicity long enough before trying to commit too early.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would use morph charts in two passes whenever the frame is uncertain: once early for breadth, and again after the first major test that challenges the original explanation.',
              'I would also annotate which sub-functions are assumed rather than known, so the chart itself records where the frame might still be unstable.',
              'My practical lesson is that a morph chart should be treated as revisable evidence of divergence, not a final map of the concept space.',
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
    subtext: 'Used biological heat-retention strategies as prompts for efficient, body-compatible concept generation.',
    overview: 'Biomimicry uses patterns from living systems as generative prompts, helping a team reimagine function, efficiency, and adaptation without relying only on familiar engineered precedents.',
    whyItMatters: 'It opens concept space by translating survival strategies into engineering logics that can later be refined and tested.',
    evidence: [
      'Praxis II: polar bear fur, hollow hairs, penguin huddling, and localized heat retention supported the shift toward finger-focused thermal management.',
      'Portfolio work: reinforced the habit of borrowing structural logic from outside the default engineering frame when divergence stalled.',
    ],
    application: 'I use biomimicry in divergence when a project benefits from alternative logics for efficiency, adaptability, or localized performance.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'D',
        claimHeadline: 'Biomimicry Should Be Used Only for Early Divergence, Then Handed Off to Testing and Electrical Constraints.',
        summary:
          'The inductive claim here is modest on purpose. Biomimicry helped generate a better thermal logic, but the project evidence supports it only as an early divergence prompt, not as a full justification for the final glove architecture.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'The project used biological references such as polar bear fur, hollow hairs, penguin huddling, and localized heat-retention strategies during divergence.',
              'Those references supported the later shift toward selective, finger-focused heating rather than heating the entire glove indiscriminately.',
              'The strongest project evidence is therefore not that the final glove looked biomimetic, but that early concept generation used natural analogies to point the team toward efficient localized thermal management.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'Biomimicry is a diverging CTMF that uses strategies from living systems as generative prompts for engineering concepts and functional logics.',
              'Within FDCR, it belongs in Diverging because its role is to expand the concept space before convergence begins.',
              'Its purpose is not to prove a final design. Its purpose is to help the team imagine a different way the problem might be solved.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'In Praxis II, biomimicry helped the team think about thermal protection as selective and efficient rather than bulky and uniform.',
              'My personal use of it matters because it countered my tendency to move quickly toward highly specified, engineer-centered solutions by temporarily widening the logic of divergence.',
              'However, the final design decisions about wire placement, voltage limits, circuit layout, and dexterity modes were justified by testing and constraints rather than by biomimicry itself.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was that biomimicry shifted divergence away from generic winter-glove logic and toward localized heat retention strategies that were later compatible with the finger-focused glove.',
              'What did not work, or at least what should not be claimed too strongly, is treating biomimicry as if it directly validated the final electrical architecture.',
              'The project evidence supports biomimicry as a generative aid, not as the main converging rationale for the final product.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF is useful for me because it interrupts my bias toward immediately analyzable and tightly specified solutions.',
              'It helped me stay in multiplicity longer by borrowing functional logic from outside my default engineering frame.',
              'At the same time, because I prefer defensible criteria, biomimicry only remained credible to me once later validation grounded it in voltage limits, dexterity tasks, and actual glove testing.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would use biomimicry only during early Diverging and then deliberately hand off to a different CTMF once constraints and testing begin to dominate.',
              'I would also state explicitly which part of the final design remained biomimetic in logic and which parts were justified by ordinary engineering tradeoffs instead.',
              'My practical rule is that if a biomimetic analogy is still carrying the argument late in the process, I probably have not converted it into engineering evidence strongly enough.',
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
              'What worked was that the Pugh chart made the team’s convergence discussable and traceable rather than purely preference-driven.',
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
              'I would also treat test results as an opportunity to reopen the convergence logic rather than only to judge whether the final bridge “passed” or “failed.”',
              'My practical lesson is that convergence tables should decide the next iteration, not serve as proof that the built structure is already fully understood.',
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
    subtext: 'Structured testing to decide both whether a concept worked and whether the project was asking the right performance questions.',
    overview: 'Verification and validation combine technical checking with fit-to-context evaluation, creating evidence that can refine both the artifact and the criteria used to judge it.',
    whyItMatters: 'This CTMF prevents late-stage testing from becoming mere confirmation and instead turns evidence into a driver of reframing and convergence.',
    evidence: [
      'Praxis II: staged dexterity and temperature tests showed which objectives were meaningful, supported glove-versus-knob-turner convergence, and justified the final convertible glove logic.',
      'CIV102: physical bridge testing exposed where the analytical model stopped accounting for real splice vulnerability.',
    ],
    application: 'I use verification and validation whenever a project needs evidence that can challenge assumptions, narrow concepts responsibly, or reveal where the model is still incomplete.',
    dossiers: [
      {
        project: 'Praxis II',
        phaseCode: 'R/C',
        claimHeadline: 'Verification and Validation Should Test the Procedure and the Criteria, Not Only the Prototype.',
        summary:
          'The grounds are the failed cold-plunge setup, the later split dexterity and temperature tests, and the convergence away from the knob-turner toward the multi-mode glove. The lesson is that evidence in Praxis II was useful because it kept changing the test logic and the success criteria, not only the artifact.',
        sections: [
          {
            title: 'Grounds',
            bullets: [
              'Stage 1 testing used knob-turning, Lego insertion, and cold-hand plunge simulation, but the cold effect lasted only 1 to 3 seconds and therefore did not produce a stable enough basis for judging designs.',
              'That procedural failure led to Stage 2, where dexterity and temperature were separated and then recombined later through more focused tasks such as telescope focusing and general grasping or placement.',
              'Validation also changed convergence: the glove path remained credible, the knob-turner was dropped, and the final multi-dexterity mode emerged only after testing showed that removing gloves for some tasks was nearly unavoidable.',
            ],
          },
          {
            title: 'What The CTMF Is',
            bullets: [
              'Verification + Validation is a CTMF that checks both whether a design works technically and whether the project is using the right criteria and procedure to judge success.',
              'Within FDCR, it spans Representing and Converging in Praxis II because the tests were not only checking prototypes; they were also deciding which objectives mattered and which concept family should continue.',
              'In Praxis terms, it includes proxy testing: approximating a standard or ideal test with the resources actually available, while staying honest about the approximation.',
            ],
          },
          {
            title: 'How I Used It',
            bullets: [
              'The project used staged testing to separate variables before trying to evaluate the integrated glove system, which was a stronger representational move than trying to test everything at once.',
              'My connection to this CTMF is direct because it aligns with my instinct to seek explicit evidence, but Praxis II also showed me that evidence quality depends on whether the test setup itself is worth trusting.',
              'This is one of the clearest places where my value of rigor improved the project after first contributing to overconstraint, because testing forced the criteria to reopen.',
            ],
          },
          {
            title: 'What Worked / What Failed',
            bullets: [
              'What worked was the decision to redesign the procedure after the cold-plunge test proved too weak and temporary to support meaningful comparison.',
              'What also worked was using validation to change the project’s success logic, especially the realization that the glove needed a controlled high-dexterity mode rather than pretending one mode could satisfy every task.',
              'What failed initially was trying to combine temperature and dexterity too early in a setup that could not hold the cold condition long enough to produce trustworthy evidence.',
            ],
          },
          {
            title: 'Fit With My Position And Biases',
            bullets: [
              'This CTMF fits my preference for measurable and defensible reasoning because it creates a visible chain from observation to assessment to action, which is close to the PIAA logic I naturally trust.',
              'It also guards against my bias toward premature precision, because it reminds me that the procedure and the criteria themselves may still be unstable.',
              'In this project, verification and validation were one of the clearest countermeasures against my own tendency to tighten the design space too early.',
            ],
          },
          {
            title: 'Going Forward',
            bullets: [
              'Going forward, I would make one rule explicit: if a proxy test cannot hold the key condition long enough to generate repeatable evidence, the procedure must be revised before the concept is judged.',
              'I would also separate verification and validation deliberately in my writing: first explain what the prototype did, then explain whether that performance mattered in the real task context.',
              'My practical lesson is that testing should not only answer “does it work,” but also “are we even asking the right question in the right way?”',
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

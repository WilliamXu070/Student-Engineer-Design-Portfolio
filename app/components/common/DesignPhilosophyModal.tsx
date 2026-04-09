'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type EvidenceFigure = {
  id: string;
  title: string;
  project: string;
  caption: string;
  src: string;
  alt: string;
  badgeClass: string;
};

type ProjectLesson = {
  id: string;
  title: string;
  paragraphs: string[];
  figureId: EvidenceFigure['id'];
};

const selectableTextStyle: CSSProperties = {
  WebkitUserSelect: 'text',
  MozUserSelect: 'text',
  msUserSelect: 'text',
  userSelect: 'text',
};

const evidenceFigures: EvidenceFigure[] = [
  {
    id: 'praxis1',
    title: 'Praxis I',
    project: 'Framing must change when the evidence changes',
    caption:
      'The Praxis I evidence sits here because it grounds the shift from simply solving the problem to questioning whether the original explanation of the problem was still valid.',
    src: '/context-evidence/praxis1-anchor.png',
    alt: 'Praxis I evidence card combining the can-noise test setup with a written reflection about revisiting assumptions.',
    badgeClass: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  },
  {
    id: 'civ102',
    title: 'CIV102',
    project: 'Simplicity is an engineering judgment, not a cosmetic one',
    caption:
      'The bridge figure supports the argument that simpler geometry was not chosen for appearance alone, but because it was easier to analyze, build, and justify.',
    src: '/context-evidence/civ102-anchor.png',
    alt: 'CIV102 evidence card combining a bridge cross-section diagram with a photo of the finished bridge.',
    badgeClass: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  },
  {
    id: 'praxis2',
    title: 'Praxis II',
    project: 'Rigor can become overconstraint',
    caption:
      'The Praxis II figure belongs with the discussion of scope narrowing and objective softening, because it shows where explicit structure had to be loosened so viable concepts could remain in play.',
    src: '/context-evidence/praxis2-anchor.png',
    alt: 'Praxis II evidence card summarizing scope narrowing and objective softening from the Beta release.',
    badgeClass: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  },
];

const figureById = new Map(evidenceFigures.map((figure) => [figure.id, figure]));

const openingParagraphs = [
  'My position as an engineering designer is that rigor matters only when it keeps the framing of the opportunity, the criteria for judgment, and the recommended concept responsive to evidence. Otherwise, rigor hardens into premature closure.',
  'My earlier position statement presented engineering as a way of thinking before it is a way of building. I still believe that. I still see engineering design as a process of turning uncertainty into clarity through disciplined reasoning and experimentation. I still value questioning assumptions, working from first principles, reducing unnecessary complexity, and learning through iteration. What has changed over this year is not those values themselves, but my understanding of where they matter most in design practice.',
  'Through Praxis I, CIV102, and Praxis II, I came to see that good engineering is not defined only by how efficiently a team solves a problem once a direction has been chosen. It depends just as much on whether the opportunity has been framed well, whether the criteria actually reflect the real constraints of the project, and whether the concept remains open to revision as representation, testing, and feedback produce new evidence. In other words, the quality of the final design depends on the quality of the reasoning that shapes it. That is the position that now organizes this portfolio.',
];

const evolutionParagraphs = [
  'My earlier position emphasized understanding over execution alone. I described engineering as a practice of questioning assumptions rather than accepting them, reasoning from fundamentals rather than copying inherited solutions, simplifying systems rather than making them impressive for their own sake, and using iteration as a way to learn through action. That earlier statement was useful, but it was still broad. It described the habits I valued without fully explaining how those habits shaped engineering design across Frame, Diverge, Converge, and Represent.',
  'Praxis gave those habits sharper meaning. Questioning assumptions became, more specifically, a commitment to revisiting the frame of an opportunity when evidence weakens the original explanation. First-principles reasoning became a way of deciding which constraints are truly fundamental, which are inherited, and which should be challenged before being turned into fixed criteria. Simplicity became less of a general aesthetic preference and more of an engineering judgment: I now value concepts whose behavior can be explained, whose trade-offs can be justified, and whose construction and validation are feasible within the actual project conditions. Iteration also became more precise in my thinking. I no longer see it only as refining solutions. I now see it as testing whether the frame, assumptions, and criteria are still valid before convergence becomes too rigid.',
  'The main change, then, is this: I used to treat precision as a sign that the thinking was strong. Now I think strong engineering design depends on timing as much as precision. Criteria, structure, and convergence are useful, but only after the opportunity has been framed well enough. When they arrive too early, they can narrow the design space before the team understands what should actually be protected, optimized, or changed. That is the central lesson that emerged across the year.',
];

const projectLessons: ProjectLesson[] = [
  {
    id: 'praxis1',
    title: 'Praxis I: framing must change when the evidence changes',
    paragraphs: [
      'Praxis I exposed the cost of staying inside a weakened frame. In the can-noise work, the most important lesson was not simply that a test result was disappointing. It was that contradictory evidence should have triggered reframing, but the team remained attached to the original explanation of the problem. That moment clarified something important about my own practice: when evidence breaks the logic of the original opportunity framing, I would rather reopen the problem than continue optimizing within an unstable explanation.',
      'Since then, I have become more alert to the difference between solving a problem well and solving the right problem.',
    ],
    figureId: 'praxis1',
  },
  {
    id: 'civ102',
    title: 'CIV102: simplicity is an engineering judgment, not a cosmetic one',
    paragraphs: [
      'CIV102 clarified why I am drawn to simpler concepts. My preference was not for a design that merely looked cleaner or more elegant. I was drawn to the bridge form that was easier to analyze, easier to represent clearly, easier to construct reliably, and easier to justify in terms of likely performance. That project helped me articulate a value that was present in my earlier statement but not yet well defined: I prefer concepts that remain legible across analysis, making, and verification.',
      'When complexity improves performance and can be defended, I accept it. But when complexity mainly creates the appearance of sophistication without the same gain in clarity, constructability, or validation, I do not trust it as readily.',
    ],
    figureId: 'civ102',
  },
  {
    id: 'praxis2',
    title: 'Praxis II: rigor can become overconstraint',
    paragraphs: [
      'Praxis II turned my own strengths back on me. Early in the project, the goals, objectives, and criteria became too rigid too early. What initially felt like rigor later appeared as overconstraint, because viable concepts were being narrowed out before enough divergence and exploration had taken place. The later scope narrowing and objective softening were important not because they reduced standards, but because they restored room for better judgment.',
      'This project made my main design risk visible: I can over-associate explicit structure, measurable criteria, and early precision with good thinking, even when the opportunity is still too unstable for those tools to be fixed.',
    ],
    figureId: 'praxis2',
  },
];

const designPracticeQuestions = [
  'Is the opportunity framing sound, or is the team solving inside assumptions that should still be challenged?',
  'Are the criteria grounded in actual stakeholder needs and project constraints, or have they hardened too early?',
  'Is the concept strong enough to be represented, constructed, and explained clearly?',
  'Can the concept be tested and validated in a way that produces meaningful evidence rather than only confirmation?',
];

const strengthsParagraphs = [
  'This position has clear strengths. It helps me expose weak assumptions, build defensible criteria, and converge toward concepts that are feasible and justifiable rather than merely attractive. It also supports the values in my earlier position statement: clarity over unnecessary complexity, understanding over execution alone, and iteration as a route to insight rather than just output.',
  'But this position also carries a bias. Because I trust explicit logic, measurable structure, and defensible criteria, ambiguity can start to feel like weak thinking even when ambiguity is still a necessary part of framing or divergence. That is why my main design risk is not lack of rigor, but premature closure. I can move too quickly toward structure, evaluation, and convergence before the opportunity has stabilized enough to support them.',
  'The guardrail I need is not less rigor. It is better-timed rigor: revisiting assumptions when evidence shifts, treating criteria as revisable, allowing divergence to do real work before narrowing, and using representation and testing to challenge the frame rather than merely confirm it.',
];

const closingParagraphs = [
  'This position is why the rest of this portfolio does not only show what I designed. It focuses on how my framing changed, how criteria were formed and revised, how concepts were selected or rejected, and how representation and testing shaped later decisions. It is also why the CTMFs I selected are not included as isolated tools, but as parts of a design practice that I am trying to understand more critically. The portfolio brief asks for a position statement that frames the organization of the portfolio and the assessment of CTMFs, and that is the role this section is intended to play.',
  'Across Praxis I, CIV102, and Praxis II, I came to see that my work is strongest not when I narrow fastest, but when I keep the design space open long enough for evidence to improve the frame before convergence begins. That does not mean delaying judgment indefinitely. It means sequencing judgment properly.',
  'That is the engineer I am trying to become: one who values disciplined reasoning, but who knows that the point of rigor is not to close uncertainty quickly. It is to close it honestly.',
];

const renderFigure = (figureId: EvidenceFigure['id']) => {
  const figure = figureById.get(figureId);

  if (!figure) {
    return null;
  }

  return (
    <figure className="my-6 rounded-[1.4rem] border border-slate-200/10 bg-[#0b1118] p-4 md:my-8 md:p-5">
      <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#0d141d]">
        <Image
          src={figure.src}
          alt={figure.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 52rem"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.04),rgba(7,10,16,0.22))]" />
      </div>

      <figcaption>
        <div
          className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] ${figure.badgeClass}`}
        >
          {figure.title}
        </div>
        <h4
          className="mb-2 text-[1.02rem] font-light leading-[1.2] text-white md:text-[1.12rem]"
          style={{ fontFamily: 'var(--font-soria)' }}
        >
          {figure.project}
        </h4>
        <p className="text-sm leading-7 text-slate-300">{figure.caption}</p>
      </figcaption>
    </figure>
  );
};

const DesignPhilosophyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { y: 28, scale: 0.985, opacity: 0 });
  }, []);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(panelRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
      });
      return;
    }

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.inOut',
    });
    gsap.to(panelRef.current, {
      y: 28,
      scale: 0.985,
      opacity: 0,
      duration: 0.38,
      ease: 'power3.inOut',
    });
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-8 right-8 z-[95] hidden h-14 min-w-[15.5rem] items-center justify-between rounded-full border border-slate-300/30 bg-[#101822] px-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.015] hover:bg-[#162231] md:flex"
        style={{ fontFamily: 'var(--font-vercetti)' }}
      >
        <div className="relative z-10 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <span className="text-[0.72rem] uppercase tracking-[0.24em]">
            Position + Values
          </span>
        </div>
      </button>

      <button
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-5 right-4 z-[95] flex h-14 w-[calc(100%-2rem)] max-w-[19rem] items-center justify-between rounded-full border border-slate-300/30 bg-[#101822] px-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.015] hover:bg-[#162231] md:hidden"
        style={{ fontFamily: 'var(--font-vercetti)' }}
      >
        <div className="relative z-10 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <span className="text-[0.72rem] uppercase tracking-[0.24em]">
            Position + Values
          </span>
        </div>
      </button>

      <div
        className={`fixed inset-0 z-[94] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,80,95,0.2),transparent_35%),rgba(3,6,12,0.62)] backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div className="absolute inset-0 flex items-center justify-center p-3 md:p-8">
          <aside
            ref={panelRef}
            className="relative h-[min(90vh,56rem)] w-[min(72rem,calc(100vw-1.5rem))] overflow-hidden rounded-[2rem] border border-slate-200/12 bg-[#0a1018] shadow-[0_24px_120px_rgba(0,0,0,0.6)] md:w-[min(78rem,calc(100vw-4rem))]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

            <div
              className="relative z-10 flex h-full flex-col overflow-hidden text-white"
              style={selectableTextStyle}
            >
              <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0a1018] px-6 pb-5 pt-6 md:px-10 md:pb-6 md:pt-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/90">
                      Position In Context
                    </div>
                    <h2
                      className="max-w-[40rem] text-3xl font-light leading-[1.02] text-white md:text-[3.1rem]"
                      style={{ fontFamily: 'var(--font-soria)' }}
                    >
                      Rigor only matters when it stays responsive to evidence
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-white/12 bg-[#141b24] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-[#1b2633] hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <p className="max-w-[50rem] text-sm leading-7 text-slate-200 md:text-[1rem]">
                  This statement explains how Praxis I, CIV102, and Praxis II changed the way I think about framing,
                  criteria, convergence, and evidence. It is the argument that now organizes the projects and CTMFs in
                  the rest of the portfolio.
                </p>
              </div>

              <div
                className="flex-1 overflow-y-auto px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8"
                style={selectableTextStyle}
              >
                <div className="mx-auto max-w-[52rem] space-y-8 md:space-y-10">
                  <section className="rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-7">
                    <div className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/90">
                      Position in Context
                    </div>
                    <div className="space-y-5 text-[0.98rem] leading-8 text-slate-100">
                      {openingParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-7">
                    <div className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-emerald-200/90">
                      How this position evolved
                    </div>
                    <div className="space-y-5 text-[0.98rem] leading-8 text-slate-100">
                      {evolutionParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-7">
                    <div className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-amber-200/90">
                      What the projects taught me
                    </div>

                    <div className="space-y-8">
                      {projectLessons.map((lesson) => (
                        <article key={lesson.id} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                          <h3
                            className="mb-4 text-[1.45rem] font-light leading-[1.1] text-white md:text-[1.8rem]"
                            style={{ fontFamily: 'var(--font-soria)' }}
                          >
                            {lesson.title}
                          </h3>
                          <div className="space-y-5 text-[0.98rem] leading-8 text-slate-100">
                            {lesson.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                          {renderFigure(lesson.figureId)}
                        </article>
                      ))}

                      <div className="rounded-[1.2rem] border border-white/10 bg-[#0b1118] p-4 md:p-5">
                        <p className="text-[0.98rem] leading-8 text-slate-100">
                          Taken together, these three projects changed my position from a general belief in
                          understanding, simplicity, and iteration into a more specific design stance. I now think good
                          engineering design depends on keeping the frame, criteria, and concept open to revision for
                          long enough that evidence can improve them before convergence closes the problem.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-7">
                    <div className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-sky-200/90">
                      What this reveals about my design practice
                    </div>

                    <p className="mb-5 text-[0.98rem] leading-8 text-slate-100">
                      In practice, this means I tend to judge design quality through four questions:
                    </p>

                    <ol className="space-y-3">
                      {designPracticeQuestions.map((question, index) => (
                        <li
                          key={question}
                          className="rounded-[1.1rem] border border-white/10 bg-[#0b1118] px-4 py-4 text-[0.98rem] leading-8 text-slate-100"
                        >
                          <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-sm text-cyan-100">
                            {index + 1}
                          </span>
                          {question}
                        </li>
                      ))}
                    </ol>

                    <div className="mt-5 space-y-5 text-[0.98rem] leading-8 text-slate-100">
                      <p>
                        These questions reflect the kind of engineering I trust most. I am most confident in decisions
                        when the reasoning is explicit, the trade-offs are defensible, and the concept can survive
                        movement across Frame, Diverge, Converge, Represent, and validation without losing coherence.
                      </p>
                      <p>
                        I do not see engineering design as a search for maximum complexity or maximum novelty. I see it
                        as a disciplined process of reducing uncertainty in the right order.
                      </p>
                    </div>
                  </section>

                  <section className="rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-7">
                    <div className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-rose-200/90">
                      Strengths, bias, and guardrails
                    </div>

                    <div className="space-y-5 text-[0.98rem] leading-8 text-slate-100">
                      {strengthsParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-7">
                    <div className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/90">
                      How this position organizes the rest of the portfolio
                    </div>

                    <div className="space-y-5 text-[0.98rem] leading-8 text-slate-100">
                      {closingParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default DesignPhilosophyModal;

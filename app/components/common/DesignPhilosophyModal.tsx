'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type PositionClaim = {
  claim: string;
  why: string;
  evidence: string;
  evidenceTag: string;
};

type PositionSection = {
  id: string;
  title: string;
  summary: string;
  badgeClass: string;
  shellClass: string;
  claims: PositionClaim[];
};

type EvidenceFigure = {
  id: string;
  title: string;
  project: string;
  caption: string;
  src: string;
  alt: string;
  badgeClass: string;
};

const headlineClaims = [
  'Good engineering depends on framing, not just solving.',
  'I trust engineering that is controllable and buildable more than engineering that only looks sophisticated.',
  'I used to think good engineering meant precise requirements and tight optimization.',
  'Now I think good engineering also requires protecting the design space from premature certainty.',
  'I have a bias toward explicit logic and measurable structure.',
  'My main design risk is premature certainty.',
];

const selectableTextStyle: CSSProperties = {
  WebkitUserSelect: 'text',
  MozUserSelect: 'text',
  msUserSelect: 'text',
  userSelect: 'text',
};

const evidenceFigures: EvidenceFigure[] = [
  {
    id: 'praxis1',
    title: 'Evidence broke the original frame',
    project: 'Praxis I',
    caption:
      'A noise-testing setup sits beside the later reflection that names the deeper issue: the team stayed attached to the original explanation even after conflicting evidence appeared.',
    src: '/context-evidence/praxis1-anchor.png',
    alt: 'Praxis I evidence card combining the can-noise test setup with a written reflection about revisiting assumptions.',
    badgeClass: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  },
  {
    id: 'civ102',
    title: 'Simple geometry, analyzable logic, buildable form',
    project: 'CIV102',
    caption:
      'The extracted bridge cross-section and the built prototype support the same claim: simplicity was a deliberate engineering choice because it improved analysis, construction, and reliability.',
    src: '/context-evidence/civ102-anchor.png',
    alt: 'CIV102 evidence card combining a bridge cross-section diagram with a photo of the finished bridge.',
    badgeClass: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  },
  {
    id: 'praxis2',
    title: 'Rigor became overconstraint',
    project: 'Praxis II',
    caption:
      'The Beta release shift is represented here as a distilled figure from the slide content: the scope narrowed, and multiple rigid objectives were softened so viable concepts would remain in play.',
    src: '/context-evidence/praxis2-anchor.png',
    alt: 'Praxis II evidence card summarizing scope narrowing and objective softening from the Beta release.',
    badgeClass: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  },
];

const positionSections: PositionSection[] = [
  {
    id: '01',
    title: 'Design Identity',
    summary:
      'These claims define the kind of student engineer I am becoming and the standards I use to judge design work.',
    badgeClass: 'border-sky-400/35 bg-sky-950 text-sky-100',
    shellClass: 'border-sky-400/25 bg-[#101c28]',
    claims: [
      {
        claim: 'Good engineering depends on framing, not just solving.',
        why:
          'In Praxis I, the vented versus unvented test weakened the original can-noise logic. What mattered most was not only that the test failed, but that the team kept working inside the old frame instead of reopening the problem.',
        evidence:
          'Use the vented and unvented test results together with your reflection on the frustration of continuing inside an invalidated assumption set.',
        evidenceTag: 'Praxis I',
      },
      {
        claim: 'I am the kind of engineer who wants the logic of a design to stay honest when the evidence changes.',
        why:
          'Your instinct in Praxis I was to reframe quickly once the evidence undercut the premise. That is a claim about how you approach problems, not just about one disappointing experiment.',
        evidence:
          'Point to the moment when the team could have kept refining the old idea, while you were focused on the deeper logic becoming unsound.',
        evidenceTag: 'Praxis I',
      },
      {
        claim: 'I trust engineering that is controllable and buildable more than engineering that only looks sophisticated.',
        why:
          'In CIV102, your push toward the simpler bridge form showed that you were drawn to a design you could analyze, construct, and execute reliably rather than a shape that looked more advanced on paper.',
        evidence:
          'Use the bridge-form comparison and the design-report rationale where simplicity and constructability are explicitly treated as strengths.',
        evidenceTag: 'CIV102',
      },
    ],
  },
  {
    id: '02',
    title: 'Values In Action',
    summary:
      'These claims show what my values look like behaviorally once a team is under pressure and choices actually need to be made.',
    badgeClass: 'border-amber-400/35 bg-[#302014] text-amber-100',
    shellClass: 'border-amber-400/25 bg-[#201611]',
    claims: [
      {
        claim: 'When evidence breaks the logic of a design, I would rather reopen the problem than protect the original idea.',
        why:
          'This is how your value of clarity shows up in Praxis I. Once the test results weakened the original premise, your instinct was to revisit the frame rather than defend the path already taken.',
        evidence:
          'Use the shift point after the vented and unvented testing, plus your reaction to the team staying inside the original can-noise frame.',
        evidenceTag: 'Praxis I',
      },
      {
        claim: 'When options compete, I prioritize clarity and constructability over complexity.',
        why:
          'In CIV102, you did not prefer a simple bridge because it looked cleaner. You preferred it because a simpler form made the design more understandable, more controllable, and more executable.',
        evidence:
          'Use the design-selection logic from the bridge report, especially where simpler geometry is tied to analysis quality and construction reliability.',
        evidenceTag: 'CIV102',
      },
      {
        claim: 'I value rigor, but I now see that rigor can become a problem when it narrows the design space too early.',
        why:
          'Praxis II gave you a strong self-critical example because the overconstraint came partly from your own method. The original goals and objectives were so detailed that they started excluding viable concepts too early.',
        evidence:
          'Use the Beta release objective softening, especially the slides where the original detailed goals had to be loosened to keep viable concepts in play.',
        evidenceTag: 'Praxis II',
      },
    ],
  },
  {
    id: '03',
    title: 'How My Position Evolved',
    summary:
      'This section makes the before-and-after arc explicit so the position reads as an iterated design stance rather than a fixed philosophy.',
    badgeClass: 'border-emerald-400/35 bg-[#15261d] text-emerald-100',
    shellClass: 'border-emerald-400/25 bg-[#111b16]',
    claims: [
      {
        claim: 'At the start of the year, I thought good engineering meant defining precise requirements early and optimizing tightly around them.',
        why:
          'That earlier view helps explain both the frame persistence in Praxis I and the over-precise objectives in early Praxis II. Precision felt like evidence that the thinking was strong.',
        evidence:
          'Use earlier process language from Praxis I and early Praxis II that emphasizes precision, early narrowing, and tight optimization.',
        evidenceTag: 'Praxis I + II',
      },
      {
        claim: 'Now I think good engineering also requires protecting the design space from premature certainty.',
        why:
          'This is the clearest statement of the shift in your position. The lesson was not to become less rigorous, but to stop letting rigor harden too early.',
        evidence:
          'Use a direct comparison between Praxis I and Praxis II to show that your later learning was about timing and openness, not about abandoning standards.',
        evidenceTag: 'Cross-Project',
      },
      {
        claim: 'I used to treat precision as the same thing as good thinking; now I see that good thinking also includes knowing when not to close the problem yet.',
        why:
          'This makes the evolution more personal. It shifts the claim away from a general theory of design and toward a change in your own reasoning habits.',
        evidence:
          'Pair the Praxis I testing moment with the Praxis II objective softening so the change reads as one evolving pattern rather than two separate anecdotes.',
        evidenceTag: 'Praxis I + II',
      },
    ],
  },
  {
    id: '04',
    title: 'Biases And Their Implications',
    summary:
      'These claims qualify the position honestly by showing where my strengths can harden into blind spots if I do not actively manage them.',
    badgeClass: 'border-rose-400/35 bg-[#2d151c] text-rose-100',
    shellClass: 'border-rose-400/25 bg-[#1d1215]',
    claims: [
      {
        claim: 'I have a bias toward explicit logic, measurable structure, and defensible criteria.',
        why:
          'This pattern appears across all three projects: the attraction to analyzable bridge forms in CIV102, the frustration with weak assumptions in Praxis I, and the detailed scoping work in Praxis II.',
        evidence:
          'Use all three projects together so the bias reads as a consistent pattern in your behavior rather than a one-off trait.',
        evidenceTag: 'Across Projects',
      },
      {
        claim: 'The downside of that bias is that ambiguity can start to feel like bad thinking, even when it is a necessary stage of design.',
        why:
          'That is the strongest statement of the risk in your examples. Ambiguity is sometimes part of framing, but your instinct is to move toward explicit logic quickly once the discussion starts to feel loose.',
        evidence:
          'Use moments where you became frustrated when a team was not clarifying quickly, or where your own detailed criteria had to be softened because they had become too rigid.',
        evidenceTag: 'Praxis I + II',
      },
      {
        claim: 'My drive for rigor helps me find weak logic, but it can also make collaboration harder when others are still working through uncertainty.',
        why:
          'This keeps the bias honest. Your rigor is not a generic strength; it can create friction when you see the frame as already invalid while others are still processing what to do next.',
        evidence:
          'Use the Praxis I frustration after the assumption failure, especially if you can point to how that affected group discussion or direction.',
        evidenceTag: 'Praxis I',
      },
      {
        claim: 'My main design risk is not lack of rigor, but premature certainty.',
        why:
          'This synthesizes the full position into one sharp qualification. The pattern is not that you avoid structure; it is that structure can harden too early if you do not keep the frame open long enough.',
        evidence:
          'Use Praxis I staying in the old frame, CIV102 preferring analyzable simplicity, and Praxis II softening over-precise objectives as one through-line.',
        evidenceTag: 'Core Risk',
      },
    ],
  },
];

const evolutionFigures = evidenceFigures.filter((figure) =>
  ['praxis1', 'praxis2'].includes(figure.id),
);

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
                      className="max-w-[28rem] text-3xl font-light leading-[1.02] text-white md:text-[3.1rem]"
                      style={{ fontFamily: 'var(--font-soria)' }}
                    >
                      How I approach engineering now
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-white/12 bg-[#141b24] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-[#1b2633] hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <p className="max-w-[46rem] text-sm leading-7 text-slate-200 md:text-[1rem]">
                  My position now is that engineering design is not strongest when it looks most precise, but when its
                  framing, logic, and constraints remain honest as evidence changes. I value buildable decisions,
                  explicit reasoning, and rigor, but this year taught me that the main risk in my approach is letting
                  certainty arrive too early.
                </p>
              </div>

              <div
                className="flex-1 overflow-y-auto px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8"
                style={selectableTextStyle}
              >
                <section className="mb-8 rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="text-[0.7rem] uppercase tracking-[0.28em] text-slate-300">
                      Core Position At A Glance
                    </div>
                    <div className="rounded-full border border-white/10 bg-[#1a2330] px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-slate-300">
                      read in under 30 seconds
                    </div>
                  </div>

                  <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {headlineClaims.map((claim, index) => (
                      <div
                        key={claim}
                        className="rounded-[1.25rem] border border-slate-200/10 bg-[#0d141d] px-4 py-4"
                      >
                        <div>
                          <div className="mb-2 text-[0.64rem] uppercase tracking-[0.22em] text-cyan-200">
                            0{index + 1}
                          </div>
                          <p className="text-sm font-medium leading-6 text-white md:text-[0.96rem]">{claim}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="max-w-[44rem] text-sm leading-7 text-slate-300">
                    The sections below unpack these headline claims through three project anchors: the Praxis I can-noise
                    framing failure, the CIV102 preference for simpler bridge forms, and the Praxis II realization that
                    rigor can become overconstraint.
                  </p>
                </section>

                <section className="mb-8 rounded-[1.6rem] border border-slate-200/10 bg-[#111925] p-5 md:p-6">
                  <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="mb-3 text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/90">
                        Context Figures
                      </div>
                      <h3
                        className="text-[1.5rem] font-light text-white md:text-[1.8rem]"
                        style={{ fontFamily: 'var(--font-soria)' }}
                      >
                        The project evidence behind the claims
                      </h3>
                    </div>
                    <p className="max-w-[36rem] text-sm leading-7 text-slate-300">
                      These extracted figures give the argument a physical anchor. Instead of only naming the project
                      moments, the modal now shows the testing, form decisions, and scope changes that shaped the
                      position.
                    </p>
                  </div>

                  <div className="grid gap-5 xl:grid-cols-3">
                    {evidenceFigures.map((figure) => (
                      <figure
                        key={figure.id}
                        className="rounded-[1.4rem] border border-slate-200/10 bg-[#0b1118] p-4"
                      >
                        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#0d141d]">
                          <Image
                            src={figure.src}
                            alt={figure.alt}
                            fill
                            sizes="(max-width: 1279px) 100vw, 30vw"
                            className="object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.04),rgba(7,10,16,0.2))]" />
                        </div>

                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div
                            className={`inline-flex rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] ${figure.badgeClass}`}
                          >
                            {figure.project}
                          </div>
                          <div className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-500">Extracted Figure</div>
                        </div>

                        <figcaption>
                          <h4
                            className="mb-2 text-[1.02rem] font-light leading-[1.2] text-white"
                            style={{ fontFamily: 'var(--font-soria)' }}
                          >
                            {figure.title}
                          </h4>
                          <p className="text-sm leading-7 text-slate-300">{figure.caption}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>

                <div className="space-y-7">
                  {positionSections.map((section) => (
                    <section
                      key={section.id}
                      className={`rounded-[1.6rem] border p-5 md:p-6 ${section.shellClass}`}
                    >
                      <div>
                        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                          <div>
                            <div
                              className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[0.64rem] uppercase tracking-[0.22em] ${section.badgeClass}`}
                            >
                              {section.id}
                            </div>
                            <h3
                              className="text-[1.5rem] font-light text-white md:text-[1.8rem]"
                              style={{ fontFamily: 'var(--font-soria)' }}
                            >
                              {section.title}
                            </h3>
                          </div>
                          <p className="max-w-[33rem] text-sm leading-7 text-slate-300">
                            {section.summary}
                          </p>
                        </div>

                        {section.id === '03' && (
                          <div className="mb-5 rounded-[1.35rem] border border-white/10 bg-[#0b1118] p-4 md:p-5">
                            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                              <div>
                                <div className="mb-2 text-[0.62rem] uppercase tracking-[0.22em] text-emerald-200/80">
                                  Evolution Snapshot
                                </div>
                                <h4
                                  className="text-[1.2rem] font-light text-white"
                                  style={{ fontFamily: 'var(--font-soria)' }}
                                >
                                  The shift is visible in the evidence itself
                                </h4>
                              </div>
                              <p className="max-w-[34rem] text-sm leading-7 text-slate-300">
                                Praxis I shows the cost of staying inside a broken frame. Praxis II shows the later move
                                to deliberately loosen constraints so the frame would not harden too early.
                              </p>
                            </div>

                            <div className="grid gap-4 xl:grid-cols-2">
                              {evolutionFigures.map((figure) => (
                                <figure
                                  key={figure.id}
                                  className="rounded-[1.2rem] border border-slate-200/10 bg-[#101822] p-3"
                                >
                                  <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-[1rem] border border-white/10 bg-[#0d141d]">
                                    <Image
                                      src={figure.src}
                                      alt={figure.alt}
                                      fill
                                      sizes="(max-width: 1279px) 100vw, 42vw"
                                      className="object-cover"
                                    />
                                  </div>
                                  <figcaption>
                                    <div
                                      className={`mb-2 inline-flex rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] ${figure.badgeClass}`}
                                    >
                                      {figure.project}
                                    </div>
                                    <p className="text-sm leading-7 text-slate-300">{figure.caption}</p>
                                  </figcaption>
                                </figure>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid gap-4 xl:grid-cols-2">
                          {section.claims.map((entry) => (
                            <article
                              key={entry.claim}
                              className="rounded-[1.3rem] border border-slate-200/10 bg-[#0b1118] p-5"
                            >
                              <div>
                                <div className="mb-3 inline-flex rounded-full border border-white/12 bg-[#141c27] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-slate-200">
                                  {entry.evidenceTag}
                                </div>
                                <h4
                                  className="mb-3 text-[1.08rem] font-light leading-[1.25] text-white"
                                  style={{ fontFamily: 'var(--font-soria)' }}
                                >
                                  {entry.claim}
                                </h4>
                                <p className="mb-4 text-sm leading-7 text-slate-100">{entry.why}</p>
                                <div className="rounded-[1rem] border border-white/10 bg-[#141c27] px-4 py-3">
                                  <div className="mb-1 text-[0.62rem] uppercase tracking-[0.22em] text-cyan-200">
                                    Evidence To Ground It
                                  </div>
                                  <p className="text-sm leading-7 text-slate-300">{entry.evidence}</p>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  ))}
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

'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type PositionMoment = {
  stage: string;
  headline: string;
  note: string;
  description: string;
  variant: 'bowl' | 'peak' | 'settling';
  accent: string;
  badgeClass: string;
  cardClass: string;
  glowClass: string;
};

const positionMoments: PositionMoment[] = [
  {
    stage: 'Before EngSci',
    headline: 'Applied science, mostly.',
    note: 'Engineering looked to me like science pointed at real-world problems.',
    description:
      'I was drawn to usefulness and consequence, but my view was still narrow. I had not yet given much weight to framing, stakeholder context, tradeoffs, or reflective iteration.',
    variant: 'bowl',
    accent: '#b7bcc5',
    badgeClass: 'border-white/10 bg-white/10 text-slate-200',
    cardClass: 'border-slate-200/18 bg-slate-300/12',
    glowClass: 'bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.22),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.14),rgba(148,163,184,0.10))]',
  },
  {
    stage: 'January',
    headline: 'Reasoning and technical strength.',
    note: 'I began to see engineering as distinct from science because it moves toward judgment, design, and argument.',
    description:
      'At that point, I still placed most of the weight on careful analysis and technical correctness. My position had sharpened, but it was less stable than I realized.',
    variant: 'peak',
    accent: '#8e403c',
    badgeClass: 'border-amber-200/20 bg-[#6e2f2d]/50 text-amber-50',
    cardClass: 'border-amber-200/22 bg-[#6e2f2d]/36',
    glowClass: 'bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_52%),linear-gradient(180deg,rgba(190,80,63,0.24),rgba(79,16,16,0.14))]',
  },
  {
    stage: 'Right Now',
    headline: 'Context, iteration, and credibility.',
    note: 'I now see engineering as analytical, iterative, human, and deeply shaped by context.',
    description:
      'What matters most to me now is framing the right problem, making tradeoffs visible, and ensuring a design remains credible when it meets real users, real materials, and real constraints.',
    variant: 'settling',
    accent: '#2f7a51',
    badgeClass: 'border-emerald-200/20 bg-emerald-500/20 text-emerald-50',
    cardClass: 'border-emerald-200/22 bg-emerald-600/24',
    glowClass: 'bg-[radial-gradient(circle_at_top,rgba(134,239,172,0.18),transparent_52%),linear-gradient(180deg,rgba(22,163,74,0.22),rgba(6,78,59,0.12))]',
  },
];

const approachPoints = [
  {
    title: 'Frame before you optimize',
    body:
      'Praxis I taught me that progress is not always forward. When evidence challenged the initial assumption, the right move was to reframe the problem instead of continuing to optimize the wrong mechanism.',
  },
  {
    title: 'Make theory answer to implementation',
    body:
      'CIV102 showed me that elegant calculations are only persuasive when they stay believable in fabrication, materials, and construction reality.',
  },
  {
    title: 'Treat reflection as part of rigor',
    body:
      'I no longer separate reflection from technical work. Reflection is how assumptions, tradeoffs, and blind spots become visible early enough to improve the design.',
  },
  {
    title: 'Design with people in view',
    body:
      'Good engineering is not only about reaching the strongest answer on paper. It also depends on communication, stakeholder context, and the consequences of the choices being made.',
  },
];

const PositionGlyph = ({
  variant,
  accent,
}: {
  variant: PositionMoment['variant'];
  accent: string;
}) => {
  const path =
    variant === 'peak'
      ? 'M18 86 Q60 10 102 86'
      : variant === 'settling'
        ? 'M18 24 Q60 84 102 24'
        : 'M18 18 Q60 82 102 18';

  const marker =
    variant === 'peak'
      ? { cx: 60, cy: 36, r: 14 }
      : variant === 'settling'
        ? { cx: 60, cy: 41, r: 13 }
        : { cx: 60, cy: 36, r: 14 };

  return (
    <svg viewBox="0 0 120 110" className="h-28 w-full overflow-visible">
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.78)"
        strokeLinecap="round"
        strokeWidth="3.5"
      />
      {variant === 'peak' && (
        <>
          <path d="M47 10 L37 16 L47 22" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M73 10 L83 16 L73 22" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="39" y1="16" x2="81" y2="16" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      <circle
        cx={marker.cx}
        cy={marker.cy}
        r={marker.r}
        fill={accent}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="2.5"
      />
      {variant === 'settling' && (
        <text
          x={marker.cx}
          y={marker.cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.88)"
          fontSize="18"
          fontFamily="var(--font-vercetti)"
        >
          ?
        </text>
      )}
    </svg>
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
        className="fixed bottom-8 right-8 z-[95] hidden h-14 min-w-[15.5rem] items-center justify-between rounded-full border border-white/20 bg-white/[0.12] px-5 text-white shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.015] md:flex"
        style={{ fontFamily: 'var(--font-vercetti)' }}
      >
        <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.05))]" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.95)]" />
          <span className="text-[0.72rem] uppercase tracking-[0.24em]">
            Position + Values
          </span>
        </div>
        <span className="relative z-10 text-sm text-white/70">
          {isOpen ? 'Close' : 'Open'}
        </span>
      </button>

      <button
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-5 right-4 z-[95] flex h-14 w-[calc(100%-2rem)] max-w-[19rem] items-center justify-between rounded-full border border-white/20 bg-white/[0.12] px-5 text-white shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.015] md:hidden"
        style={{ fontFamily: 'var(--font-vercetti)' }}
      >
        <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.05))]" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.95)]" />
          <span className="text-[0.72rem] uppercase tracking-[0.24em]">
            Position + Values
          </span>
        </div>
        <span className="relative z-10 text-sm text-white/70">
          {isOpen ? 'Close' : 'Open'}
        </span>
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
            className="relative h-[min(90vh,56rem)] w-[min(72rem,calc(100vw-1.5rem))] overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] shadow-[0_24px_120px_rgba(0,0,0,0.55)] backdrop-blur-[34px] md:w-[min(78rem,calc(100vw-4rem))]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(119,190,221,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />

            <div className="relative z-10 flex h-full flex-col overflow-hidden text-white">
              <div className="sticky top-0 z-20 border-b border-white/10 bg-[linear-gradient(180deg,rgba(6,10,18,0.82),rgba(6,10,18,0.35))] px-6 pb-5 pt-6 backdrop-blur-xl md:px-10 md:pb-6 md:pt-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 text-[0.68rem] uppercase tracking-[0.32em] text-cyan-100/80">
                      Position In Context
                    </div>
                    <h2
                      className="max-w-[26rem] text-3xl font-light leading-[1.02] text-white md:text-[3.1rem]"
                      style={{ fontFamily: 'var(--font-soria)' }}
                    >
                      How I approach engineering now
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <p className="max-w-[38rem] text-sm leading-6 text-white/72 md:text-[1rem]">
                  My view of engineering has shifted from applied science, to careful reasoning, to
                  a practice that combines analysis, judgment, iteration, communication, and human
                  context.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
                <section className="mb-8 rounded-[1.6rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="text-[0.7rem] uppercase tracking-[0.28em] text-white/55">
                    Position Over Time
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
                    scroll to read
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {positionMoments.map((moment) => (
                    <article
                      key={moment.stage}
                      className={`relative overflow-hidden rounded-[1.45rem] border p-4 ${moment.cardClass}`}
                    >
                      <div className={`pointer-events-none absolute inset-0 ${moment.glowClass}`} />
                      <div className="relative z-10">
                        <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[0.64rem] uppercase tracking-[0.22em] ${moment.badgeClass}`}>
                          {moment.stage}
                        </div>
                        <PositionGlyph variant={moment.variant} accent={moment.accent} />
                        <h3
                          className="mb-2 text-[1.2rem] font-light text-white"
                          style={{ fontFamily: 'var(--font-soria)' }}
                        >
                          {moment.headline}
                        </h3>
                        <p className="mb-3 text-sm leading-6 text-white/90">{moment.note}</p>
                        <p className="text-sm leading-6 text-white/74">{moment.description}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="relative mt-6 h-12 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
                  <div className="absolute left-4 right-5 top-1/2 h-px -translate-y-1/2 bg-white/18" />
                  <div className="absolute right-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-45 border-r border-t border-white/40" />
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[0.72rem] uppercase tracking-[0.24em] text-white/42">
                    Representation of the shift in my position over time
                  </div>
                </div>
              </section>

                <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                  <section className="relative overflow-hidden rounded-[1.6rem] border border-amber-200/18 bg-[#6e2f2d]/28 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] md:p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_40%),linear-gradient(180deg,rgba(190,80,63,0.18),rgba(79,16,16,0.08))]" />
                    <div className="relative z-10">
                      <div className="mb-4 text-[0.7rem] uppercase tracking-[0.28em] text-amber-50/72">
                        Updated Position
                      </div>
                      <p className="text-[0.98rem] leading-7 text-white/90">
                        I now see engineering as a practice that combines analysis, judgment, creativity,
                        and human context. Good engineering is not just about using theory correctly or
                        optimizing a design on paper. It is about framing the right problem, questioning
                        assumptions, making tradeoffs visible, and ensuring that a design remains
                        credible when it meets real materials, real users, and real constraints.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="mb-1 text-[0.7rem] uppercase tracking-[0.28em] text-white/55">
                      Values In Practice
                    </div>
                    {approachPoints.map((point, index) => (
                      <article
                        key={point.title}
                        className="relative overflow-hidden rounded-[1.45rem] border border-amber-200/18 bg-[#6e2f2d]/24 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]"
                      >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.12),transparent_45%),linear-gradient(180deg,rgba(190,80,63,0.14),rgba(79,16,16,0.06))]" />
                        <div className="relative z-10">
                          <div className="mb-2 text-[0.68rem] uppercase tracking-[0.22em] text-amber-100/82">
                            0{index + 1}
                          </div>
                          <h3
                            className="mb-2 text-[1.15rem] font-light text-white"
                            style={{ fontFamily: 'var(--font-soria)' }}
                          >
                            {point.title}
                          </h3>
                          <p className="text-sm leading-6 text-white/86">{point.body}</p>
                        </div>
                      </article>
                    ))}
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

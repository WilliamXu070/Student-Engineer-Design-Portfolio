import { useEffect, useState, useRef } from "react";
import { usePortalStore } from "@stores";
import { PROJECT_DETAILS, type ProjectDetail } from "../../../constants/projectsData";
import gsap from "gsap";

const ProjectDetailsOverlay = () => {
  const activeProjectSlug = usePortalStore((state) => state.activeProjectSlug);
  const setActiveProjectSlug = usePortalStore((state) => state.setActiveProjectSlug);
  const [localData, setLocalData] = useState<ProjectDetail | null>(null);
  
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeProjectSlug) {
      setLocalData(PROJECT_DETAILS[activeProjectSlug]);
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          backgroundColor: 'rgba(0,0,0,0.3)',
          pointerEvents: 'auto',
          duration: 0.5,
        });
      }
      if (panelRef.current) {
        gsap.to(panelRef.current, {
          x: '0%',
          duration: 0.8,
          ease: "power3.out",
        });
      }
    } else {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          backgroundColor: 'rgba(0,0,0,0)',
          pointerEvents: 'none',
          duration: 0.5,
        });
      }
      if (panelRef.current) {
        gsap.to(panelRef.current, {
          x: '100%',
          duration: 0.8,
          ease: "power3.in",
        });
      }
    }
  }, [activeProjectSlug]);

  const data = localData;

  return (
    <div 
      ref={bgRef}
      className="project-overlay-bg fixed inset-0 z-50 pointer-events-none transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div 
        ref={panelRef}
        className="project-overlay-panel absolute top-0 right-0 h-full w-full md:w-[60%] lg:w-[50%] bg-black/60 backdrop-blur-xl border-l border-white/10 p-8 md:p-16 overflow-y-auto pointer-events-auto transform translate-x-full shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
      >
        <button 
          onClick={() => setActiveProjectSlug(null)}
          className="absolute top-8 left-8 md:top-12 md:left-12 text-white/70 hover:text-white flex items-center gap-2 group transition-colors"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span className="text-sm font-medium tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>Back to Timeline</span>
        </button>

        <div className="mt-16 md:mt-20">
          <p className="text-white/50 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>{data?.course}</p>
          <h1 className="text-4xl md:text-6xl text-white font-light mb-12" style={{ fontFamily: 'var(--font-soria)' }}>
            {data?.title}
          </h1>

          <div className="space-y-12 text-white/80" style={{ fontFamily: 'var(--font-inter)' }}>
            
            <section>
              <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-soria)' }}>01. Objective & Overview</h2>
              <p className="leading-relaxed font-light">{data?.overview}</p>
            </section>

            <section>
              <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-soria)' }}>02. Criteria & Constraints</h2>
              <ul className="list-disc pl-5 space-y-2 font-light">
                {data?.criteria.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-soria)' }}>03. Iterative Design Process</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-white/90 mb-2">Stakeholders & Brief Refinement</h3>
                  <p className="leading-relaxed font-light">{data?.process.refinement}</p>
                </div>
                
                <div>
                  <h3 className="text-lg text-white/90 mb-2">Generation of Solutions</h3>
                  <p className="leading-relaxed font-light">{data?.process.generation}</p>
                </div>
                
                <div>
                  <h3 className="text-lg text-white/90 mb-2">Assessment (Pugh Chart)</h3>
                  <p className="leading-relaxed font-light">{data?.process.assessment}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-soria)' }}>04. Self-Reflection</h2>
              <p className="leading-relaxed font-light italic text-white/70">&ldquo;{data?.process.reflection}&rdquo;</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsOverlay;

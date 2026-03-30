import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { usePortalStore, useScrollStore } from "@stores";

export const ScrollHint = () => {
  const [hintText, setHintText] = useState('');
  const [showScrollHint, setShowScrollHint] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portal = usePortalStore((state) => state.activePortalId);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  // Show 'Scroll' for Hero and work portals, 'Pan' for Projects portal.
  useEffect(() => {
    if (!portal) {
      if (scrollProgress === 0) {
        setHintText('SCROLL');
        setShowScrollHint(true);
      } else {
        setShowScrollHint(false);
      }
    } else {
      if (portal === 'work') {
        setHintText('SCROLL');
        setShowScrollHint(scrollProgress === 0);
      } else {
        setHintText('PAN');
        setShowScrollHint(true);
      }
    }
  }, [portal, scrollProgress]);

  useEffect(() => {
    const hint = hintRef.current;
    const content = contentRef.current;

    if (!hint || !content) {
      return;
    }

    gsap.killTweensOf(hint);
    gsap.killTweensOf(content);

    if (showScrollHint) {
      gsap.to(hint, {
        opacity: 1,
        duration: 1.5,
        delay: 1.5,
      });

      if (!portal) {
        gsap.fromTo(
          content,
          {
            scale: 0.92,
            filter: "hue-rotate(0deg) saturate(1.1)",
          },
          {
            scale: 1.14,
            filter: "hue-rotate(360deg) saturate(1.6)",
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      } else {
        gsap.fromTo(
          content,
          {
            scale: 0.96,
          },
          {
            scale: 1.06,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      }
    } else {
      gsap.to(hint, {
        opacity: 0,
        duration: 0.5,
      });
      gsap.set(content, {
        clearProps: "transform,filter",
      });
    }
  }, [portal, showScrollHint]);

  const svgSrc = hintText === 'PAN' ? 'icons/chevrons-left-right.svg' : 'icons/chevrons-up-down.svg';

  return (
    <div ref={hintRef} className="fixed w-full bottom-5 scroll-hint" style={{ opacity: 0 }}>
      <div
        ref={contentRef}
        className="flex items-center justify-center gap-2"
        style={{
          transformOrigin: "center",
          willChange: "transform, filter",
        }}>
        { showScrollHint }
        <Image src={svgSrc} width={18} height={18} alt="night mode" loading="lazy" />
        <span className="text-white">{hintText}</span>
      </div>
    </div>
  );
}

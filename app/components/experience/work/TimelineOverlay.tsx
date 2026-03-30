'use client';

import { rememberReturnTarget, rememberSceneSnapshot } from "@/app/lib/navigationMemory";
import { usePortalStore, useScrollStore, useTimelineOverlayStore } from "@stores";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const TimelineOverlay = () => {
  const router = useRouter();
  const isActive = usePortalStore((state) => state.activePortalId === "work");
  const sceneCameraPosition = usePortalStore((state) => state.sceneCameraPosition);
  const sceneCameraRotation = usePortalStore((state) => state.sceneCameraRotation);
  const rootScrollProgress = useScrollStore((state) => state.scrollProgress);
  const itemMap = useTimelineOverlayStore((state) => state.items);
  const hoveredSlug = useTimelineOverlayStore((state) => state.hoveredSlug);
  const selectedSlug = useTimelineOverlayStore((state) => state.selectedSlug);
  const setHoveredSlug = useTimelineOverlayStore((state) => state.setHoveredSlug);
  const setSelectedSlug = useTimelineOverlayStore((state) => state.setSelectedSlug);
  const items = useMemo(() => Object.values(itemMap), [itemMap]);

  if (!isActive || items.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {items.map((item) => {
        const isHovered = hoveredSlug === item.slug;
        const isSelected = selectedSlug === item.slug;

        return (
          <button
            key={item.slug}
            type="button"
            onClick={() => {
              const rootScrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement | null;
              const activeWorkScrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement | null;
              const rootScrollableHeight = rootScrollWrapper ? rootScrollWrapper.scrollHeight - rootScrollWrapper.clientHeight : 0;
              const workScrollableHeight = activeWorkScrollWrapper ? activeWorkScrollWrapper.scrollHeight - activeWorkScrollWrapper.clientHeight : 0;

              setSelectedSlug(item.slug);
              rememberSceneSnapshot({
                activePortalId: "work",
                cameraPosition: sceneCameraPosition,
                cameraRotation: sceneCameraRotation,
                rootScrollProgress: rootScrollWrapper && rootScrollableHeight > 0
                  ? rootScrollWrapper.scrollTop / rootScrollableHeight
                  : rootScrollProgress,
                workScrollProgress: activeWorkScrollWrapper && workScrollableHeight > 0
                  ? activeWorkScrollWrapper.scrollTop / workScrollableHeight
                  : rootScrollProgress,
              });
              rememberReturnTarget({ href: "/?portal=work", label: "Back to Projects" });
              router.push(`/projects/${item.slug}`);
            }}
            onMouseEnter={() => setHoveredSlug(item.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            className="pointer-events-auto absolute rounded-[18px] border px-4 py-3 text-white backdrop-blur-md transition-all duration-200"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: "220px",
              transform: `translate(${item.align === "left" ? "-100%" : "0"}, -50%)`,
              textAlign: item.align === "left" ? "right" : "left",
              borderColor: isHovered || isSelected ? "rgba(189, 209, 227, 0.95)" : "rgba(148, 163, 184, 0.5)",
              background: isHovered || isSelected ? "rgba(10, 18, 32, 0.74)" : "rgba(10, 18, 32, 0.42)",
              boxShadow: isHovered || isSelected ? "0 0 0 1px rgba(189, 209, 227, 0.24), 0 18px 40px rgba(2, 6, 23, 0.24)" : "none",
            }}
            aria-label={`Open ${item.title} project page`}>
            <span
              className="block text-[10px] uppercase tracking-[0.22em] opacity-75"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {item.year}
            </span>
            <span
              className="mt-2 block text-[26px] leading-none"
              style={{ fontFamily: "var(--font-soria)" }}>
              {item.title}
            </span>
            <span
              className="mt-2 block text-xs opacity-80"
              style={{ fontFamily: "var(--font-vercetti)" }}>
              {item.subtitle}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TimelineOverlay;

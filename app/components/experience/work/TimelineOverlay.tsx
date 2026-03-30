'use client';

import { WORK_TIMELINE } from "@constants";
import { rememberReturnTarget, rememberSceneSnapshot } from "@/app/lib/navigationMemory";
import { getPortalScrollLayers } from "@/app/lib/portalUi";
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
  const setHoveredSlug = useTimelineOverlayStore((state) => state.setHoveredSlug);
  const setSelectedSlug = useTimelineOverlayStore((state) => state.setSelectedSlug);
  const items = useMemo(() => Object.values(itemMap), [itemMap]);
  const itemConfigMap = useMemo(
    () => new Map(WORK_TIMELINE.map((item) => [item.slug, item])),
    []
  );

  if (!isActive || items.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {items.map((item) => {
        const config = itemConfigMap.get(item.slug);

        if (!config) {
          return null;
        }

        return (
          <button
            key={item.slug}
            type="button"
            onWheel={(event) => {
              const { work: activeWorkScrollWrapper } = getPortalScrollLayers();

              if (!activeWorkScrollWrapper) {
                return;
              }

              event.preventDefault();
              activeWorkScrollWrapper.scrollTop -= event.deltaY;
            }}
            onClick={() => {
              const { root: rootScrollWrapper, work: activeWorkScrollWrapper } = getPortalScrollLayers();
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
              rememberReturnTarget({ href: "/?portal=work", label: "Back to Timeline" });
              router.push(`/projects/${item.slug}`);
            }}
            onMouseEnter={() => setHoveredSlug(item.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            className="pointer-events-auto absolute rounded-[18px] border text-white transition-all duration-200"
            style={{
              left: `${config.overlayLeft}px`,
              top: `${config.overlayTop}px`,
              width: `${config.overlayWidth}px`,
              height: `${config.overlayHeight}px`,
              transform: "none",
              borderColor: "transparent",
              background: "transparent",
              boxShadow: "none",
            }}
            aria-label={`Open ${item.title} project page`}>
            <span className="sr-only">Open {item.title} project page</span>
          </button>
        );
      })}
    </div>
  );
};

export default TimelineOverlay;

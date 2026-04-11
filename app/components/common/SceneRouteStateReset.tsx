'use client';

import { useEffect } from "react";

import { removePortalCloseButton } from "@/app/lib/portalUi";
import { usePortalStore, useTimelineOverlayStore } from "@stores";

const SceneRouteStateReset = () => {
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const setActiveProjectSlug = usePortalStore((state) => state.setActiveProjectSlug);
  const setSceneMotionPaused = usePortalStore((state) => state.setSceneMotionPaused);
  const setSceneRestoring = usePortalStore((state) => state.setSceneRestoring);
  const clearTimelineItems = useTimelineOverlayStore((state) => state.clearItems);
  const setHoveredSlug = useTimelineOverlayStore((state) => state.setHoveredSlug);
  const setSelectedSlug = useTimelineOverlayStore((state) => state.setSelectedSlug);

  useEffect(() => {
    setActivePortal(null);
    setActiveProjectSlug(null);
    setSceneMotionPaused(false);
    setSceneRestoring(false);
    clearTimelineItems();
    setHoveredSlug(null);
    setSelectedSlug(null);
    removePortalCloseButton();
    document.body.style.cursor = "auto";
  }, [
    clearTimelineItems,
    setActivePortal,
    setActiveProjectSlug,
    setHoveredSlug,
    setSceneMotionPaused,
    setSceneRestoring,
    setSelectedSlug,
  ]);

  return null;
};

export default SceneRouteStateReset;

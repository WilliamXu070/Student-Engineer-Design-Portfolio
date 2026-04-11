'use client';

import { ensurePortalCloseButton } from "@/app/lib/portalUi";
import { getPortalScrollLayers } from "@/app/lib/portalUi";
import { useSearchParams } from "next/navigation";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { isMobile } from "react-device-detect";

import {
  clearSceneSnapshot,
  getProjectsPortalCameraPosition,
  getProjectsPortalCameraRotation,
  type SceneSnapshot,
  readSceneSnapshot,
} from "@/app/lib/navigationMemory";
import { usePortalStore, useScrollStore, useTimelineOverlayStore } from "@stores";

const SceneSnapshotRestorer = () => {
  const { camera } = useThree();
  const searchParams = useSearchParams();
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const setActiveProjectSlug = usePortalStore((state) => state.setActiveProjectSlug);
  const setPortalReturnRootScrollProgress = usePortalStore((state) => state.setPortalReturnRootScrollProgress);
  const setWorkPortalScrollProgress = usePortalStore((state) => state.setWorkPortalScrollProgress);
  const setSceneMotionPaused = usePortalStore((state) => state.setSceneMotionPaused);
  const setSceneRestoring = usePortalStore((state) => state.setSceneRestoring);
  const setRestoredPortalId = usePortalStore((state) => state.setRestoredPortalId);
  const setSceneCameraSnapshot = usePortalStore((state) => state.setSceneCameraSnapshot);
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);
  const clearTimelineItems = useTimelineOverlayStore((state) => state.clearItems);
  const setHoveredSlug = useTimelineOverlayStore((state) => state.setHoveredSlug);
  const setSelectedSlug = useTimelineOverlayStore((state) => state.setSelectedSlug);

  useFrame(() => {
    if (isSceneRestoring) {
      return;
    }

    setSceneCameraSnapshot(
      [camera.position.x, camera.position.y, camera.position.z],
      [camera.rotation.x, camera.rotation.y, camera.rotation.z]
    );
  });

  useLayoutEffect(() => {
    const storedSnapshot = readSceneSnapshot();
    const queryPortal = searchParams.get("portal");
    const fallbackPortalId = queryPortal === "projects" || queryPortal === "work" ? queryPortal : null;

    const fallbackSnapshot: SceneSnapshot | null = fallbackPortalId
      ? {
          activePortalId: fallbackPortalId,
          cameraPosition: fallbackPortalId === "projects"
            ? getProjectsPortalCameraPosition(isMobile)
            : [camera.position.x, camera.position.y, camera.position.z],
          cameraRotation: fallbackPortalId === "projects"
            ? getProjectsPortalCameraRotation()
            : [camera.rotation.x, camera.rotation.y, camera.rotation.z],
          rootScrollProgress: 0,
          workScrollProgress: 0,
        }
      : null;

    const baseSnapshot = storedSnapshot ?? fallbackSnapshot;

    if (!baseSnapshot) {
      return;
    }

    const snapshot = baseSnapshot.activePortalId === "projects"
      ? {
          ...baseSnapshot,
          cameraPosition: getProjectsPortalCameraPosition(isMobile),
          cameraRotation: getProjectsPortalCameraRotation(),
        }
      : baseSnapshot;

    const applyCameraSnapshot = () => {
      camera.position.set(...snapshot.cameraPosition);
      camera.rotation.set(...snapshot.cameraRotation);
      camera.updateProjectionMatrix();
      setSceneCameraSnapshot(snapshot.cameraPosition, snapshot.cameraRotation);
    };

    const applyRootScrollSnapshot = () => {
      const { root: rootScrollWrapper } = getPortalScrollLayers();

      if (!rootScrollWrapper) {
        return false;
      }

      const rootScrollableHeight = rootScrollWrapper.scrollHeight - rootScrollWrapper.clientHeight;
      rootScrollWrapper.scrollTop = Math.max(0, rootScrollableHeight * snapshot.rootScrollProgress);
      rootScrollWrapper.dispatchEvent(new Event("scroll"));
      return true;
    };
    const applyWorkScrollSnapshot = () => {
      if (snapshot.activePortalId !== "work") {
        return true;
      }

      const { work: activeScrollWrapper } = getPortalScrollLayers();

      if (!activeScrollWrapper) {
        return false;
      }

      const scrollableHeight = activeScrollWrapper.scrollHeight - activeScrollWrapper.clientHeight;
      activeScrollWrapper.scrollTop = Math.max(0, scrollableHeight * snapshot.workScrollProgress);
      activeScrollWrapper.dispatchEvent(new Event("scroll"));
      return true;
    };

    setSceneMotionPaused(true);
    setSceneRestoring(true);
    setRestoredPortalId(snapshot.activePortalId);
    setActiveProjectSlug(null);
    clearTimelineItems();
    setHoveredSlug(null);
    setSelectedSlug(null);
    setPortalReturnRootScrollProgress(snapshot.rootScrollProgress);
    
    if (snapshot.activePortalId === "projects") {
      const { root: rootScrollWrapper } = getPortalScrollLayers();
      const fixedLayer = rootScrollWrapper?.firstElementChild as HTMLElement | null;
      if (fixedLayer) {
        fixedLayer.style.pointerEvents = "none";
      }
      ensurePortalCloseButton();
    }
    
    setScrollProgress(snapshot.rootScrollProgress);
    setWorkPortalScrollProgress(snapshot.workScrollProgress);
    setActivePortal(snapshot.activePortalId);
    applyCameraSnapshot();
    const retryTimers: number[] = [];
    const retryFrames: number[] = [];
    const restoreStep = () => {
      applyCameraSnapshot();
      applyRootScrollSnapshot();
      applyWorkScrollSnapshot();
    };

    restoreStep();

    retryFrames.push(
      window.requestAnimationFrame(() => {
        restoreStep();
        retryFrames.push(
          window.requestAnimationFrame(() => {
            restoreStep();
          }),
        );
      }),
    );

    retryTimers.push(window.setTimeout(restoreStep, 60));
    retryTimers.push(window.setTimeout(restoreStep, 140));
    retryTimers.push(window.setTimeout(restoreStep, 260));

    const releaseTimer = window.setTimeout(() => {
      restoreStep();
      clearSceneSnapshot();
      setSceneRestoring(false);
      setSceneMotionPaused(false);
    }, snapshot.activePortalId === "work" ? 320 : 180);
    retryTimers.push(releaseTimer);

    return () => {
      retryFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      retryTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [camera, clearTimelineItems, isMobile, searchParams, setActivePortal, setActiveProjectSlug, setHoveredSlug, setPortalReturnRootScrollProgress, setRestoredPortalId, setSceneCameraSnapshot, setSceneMotionPaused, setSceneRestoring, setScrollProgress, setSelectedSlug, setWorkPortalScrollProgress]);

  return null;
};

export default SceneSnapshotRestorer;
